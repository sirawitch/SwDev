const mongoose=require('mongoose');
const HospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plase add a name'],
        unique:true,
        trim:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type:String,
        required:[true,'Plase add an address']
    },
    district:{
        type:String,
        required:[true,'Please add an a district']
    },
    province:{
        type:String,
        required:[true,'Please add an a province']
    },
    postalcode:{
        type:String,
        required:[true,'Please add an a postal code'],
        maxlength:[5,'Postal code can not be more than 5 digits']
    },
    tel:{
        type:String
    },
    region:{
        type:String,
        required:[true,'Please add an a region']
    },
})
module.exports=mongoose.model('Hospital',HospitalSchema);