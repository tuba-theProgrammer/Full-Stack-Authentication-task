const mongoose = require("mongoose");

const AuthenticationSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:false
    }
})


const auth_schema = mongoose.model("auth_schema", AuthenticationSchema);
module.exports={ auth_schema}
