const sql= require('../config/vacCentersDB')
const vacCenter = function(vacCenter){
    this.id=vacCenter.id;
    this.name=vacCenter.name;
    this.tel=vacCenter.tel;
}
vacCenter.getAll = result =>{
    sql.query("SELECT * FROM vacCenters",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
    })
}