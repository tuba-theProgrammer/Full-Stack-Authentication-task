const {auth_schema} = require('../Schema/authenticationSchema')


const CreateAccount = async (req,res)=>{
   const {email,username,pass,image} = req.body;
   console.log('Create Account Call')
   console.log(req.body)
   
   await auth_schema.create({email,username,pass,image},(err,User)=>{
      if(err){
        res.status(401).send({msg:"Error while creating user Schema"})
      }else{
        res.status(200).json({msg: 'User account created successfully'})
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

module.exports= {CreateAccount,DeleteAccount,UpdateAccount,DisplayData}