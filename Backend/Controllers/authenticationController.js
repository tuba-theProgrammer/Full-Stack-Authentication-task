const {auth_schema} = require('../Schema/authenticationSchema')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Token = require('../Schema/TokenSchema')
const {sendEmail} = require('../Utils/sendEmail')

const CreateAccount = async (req,res)=>{
   const {email,username,pass,image} = req.body;
   console.log('Create Account Call')
   console.log(req.body)

   let user = await auth_schema.findOne({ email: email });
   if (user) {
     throw new Error("Email already exist");
   }


   const token = JWT.sign({ id: user._id }, JWTSecret);
   await auth_schema.create({email,username,pass,image},(err,User)=>{
      if(err){
        res.status(401).send({msg:"Error while creating User account"})
      }else{
        res.status(200).json({msg: 'User account created successfully',data:{
            email: email,
            username: username,
            pass: pass,
            image: image,
            token: token
        }})
      }
   })


}

const DeleteAccount = async (req,res) =>{
    const {id}=req.params;
  console.log(id)

  await auth_schema.findByIdAndDelete(id)
  const authData=await auth_schema.find()
  res.status(200).send(
      authData
  )
}

const UpdateAccount = async (req,res)=>{
    const {id}=req.params;
    console.log(req.body)
    const {email,username,pass,image} = req.body;
  await auth_schema.updateOne({_id:id},{email:email,username:username,pass:pass,image:image}).then(function(){
      res.status(200).json({msg:"Updated"})
  }).catch(function(err)
  {
      res.status(401).json({msg:"Error while updating data Updated"})
  });
}

const DisplayData = async(req,res) =>{
    const userData =  await auth_schema.find();
    console.log(userData)
    res.status(200).send(
        userData) 
}



const RequestPassReset = async( req,res)=>{
    const {email}= req.body
    const user = await auth_schema.findOne({ email });

  if (!user) throw new Error("User does not exist");
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: auth_schema._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `http://localhost:3002/passwordReset?token=${resetToken}&id=${auth_schema._id}`;
  sendEmail(user.email,"Password Reset Request",{name: auth_schema.username,link: link,},"./template/requestResetPassword.handlebars");
  return link;
}




    const resetPassword = async (req,res) => {
        const {userId, token, password} = req.body
        let passwordResetToken = await Token.findOne({ userId });
        if (!passwordResetToken) {
          throw new Error("Invalid or expired password reset token");
        }
        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }
        const hash = await bcrypt.hash(password, Number(bcryptSalt));
        await User.updateOne(
          { _id: userId },
          { $set: { password: hash } },
          { new: true }
        );
        const user = await User.findById({ _id: userId });
        sendEmail(
          user.email,
          "Password Reset Successfully",
          {
            name: user.name,
          },
          "./template/resetPassword.handlebars"
        );
        await passwordResetToken.deleteOne();
        return true;
      };


module.exports= {CreateAccount,DeleteAccount,UpdateAccount,DisplayData,RequestPassReset,resetPassword}