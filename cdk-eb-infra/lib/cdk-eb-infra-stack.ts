import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import s3assets = require('@aws-cdk/aws-s3-assets');
import elasticbeanstalk = require('@aws-cdk/aws-elasticbeanstalk');
import iam = require('@aws-cdk/aws-iam');
export class CdkEbInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const webAppZipArchive = new s3assets.Asset(this, "WebAppZip", {
      path: `${__dirname}/../app.zip`,
    });
    const appName = 'MyWebApp';
    const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
      applicationName: appName,
    });
    const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(this, 'AppVersion', {
    applicationName: appName,
    sourceBundle: {
        s3Bucket: webAppZipArchive.s3BucketName,
        s3Key: webAppZipArchive.s3ObjectKey,
    },
    });
    appVersionProps.addDependsOn(app);
    const myRole = iam.Role.fromRoleArn(
      this,
      'LabRole',
      'arn:sws:iam::390681197962:role:LabRole',
      {
        mutable:false,
      }
    );

    const myProfileName = `${appName}-InstanceProfile`

    const instanceProfile = new iam.CfnInstanceProfile(this, myProfileName, {
      instanceProfileName: myProfileName,
      roles: [
        myRole.roleName
      ] 
    });
    const optionSettingProperties: elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
    {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: myProfileName,
    },
    {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MinSize',
        value: '1',
    },
    {
        namespace: 'aws:autoscaling:asg',
        optionName: 'MaxSize',
        value: '1',
    },
    {
        namespace: 'aws:ec2:instances',
        optionName: 'InstanceTypes',
        value: 't2.micro',
    },
];
const elbEnv = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
    environmentName: 'MyWebAppEnvironment',
    applicationName: app.applicationName || appName,
    solutionStackName: '64bit Amazon Linux 2 v5.8.0 running Node.js 18',
    optionSettings: optionSettingProperties,
    versionLabel: appVersionProps.ref,
});
        // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkEbInfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
