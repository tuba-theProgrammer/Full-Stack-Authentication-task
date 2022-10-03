const mongoose = require("mongoose");
const {bcryptAuth} = require('../Middleware/authMiddleware')
const AuthenticationSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim: true,
        unique: true,
    },
    username:{
        type:String,
        required:true,
        trim: true,
        unique: true,
    },
    pass:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:false
    },
   
},{
    timestamps: true,
},

)
AuthenticationSchema.pre("save",bcryptAuth)

const auth_schema = mongoose.model("auth_schema", AuthenticationSchema);
module.exports={ auth_schema}
