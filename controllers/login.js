const Admin = require('../models/Admin')
const { encrypt } = require('../services/crypto')

const index = (req,res) => {
    Admin.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
        message:'There is an Error'
        })      
    })
}


const show = (req,res) => {
    let adminID = req.body.adminID
    Admin.findById(adminID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'There is an Error'
        })
    })
}



const store = async (req,res) => {
    const {name, email, password} = req.body
    const hashedPassword = await encrypt(password)
    let admin = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
        id: req.body.id
    })
    console.log(admin)
    admin.save()
    .then(response => {
        res.json({
            message:'login successfully'
        })
    })
    .catch(error => {
        res.json({
            message:'There is an Error'
        
        })
    })
}



const update = (req,res) => {
    let adminID = req.body.adminID
    let updatedData = {
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    }
    Admin.findByIdAndUpdate(adminID,{$set:updatedData})
    .then(() => {
        res.json({
            message:'Admin updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message:'There is an Error'
        
        })
    })
}



const destroy = (req,res) => {
    let adminID = req.body.adminID
    Admin.findByIdAndRemove(adminID)
    .then(() => {
        res.json({
            message:'Admin deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message:'There is an Error'
        
        })
    })

}


module.exports={
    index, show, store, update, destroy
}