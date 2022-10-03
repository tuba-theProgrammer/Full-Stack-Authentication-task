const express= require('express')
const app= express()

const authConntroller = require('../Controllers/authenticationController')
app.post('/CreateAccount',authConntroller.CreateAccount)
app.post('/UpdateAccount',authConntroller.UpdateAccount)
app.get('/DisplayData',authConntroller.DisplayData)
app.post('/User',authConntroller.DeleteAccount)

module.exports= app