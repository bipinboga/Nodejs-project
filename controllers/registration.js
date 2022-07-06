const { encrypt } = require('../services/crypto')
const { generateOTP } = require('../services/OTP')
const { sendMail } = require('../services/MAIL')
const User = require('../models/User')
const { send } = require('express/lib/response')

module.exports.signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    const isExisting = await findeUserByEmail(email)
    if(isExisting) {
        return res.send('Already existing')
    }
    console.log(name, email, password)
    const newUser = await createUser(email, password);
    if(!newUser[0]){
        return res.status(400).send({
            message: 'Unable to create new user'
        })
    }
    res.send(newUser)
}


module.exports.verifyEmail = async(req, res) => {
    const {email, otp} = req.body
    const user = await validateUserSignUp(email, otp)
    res.send(user)
}

const findeUserByEmail = async (email) => {
    const user = await User.findOne({
        email,
    })
    if(!user){
        return false
    }
    return user
}

const createUser = async (email, password) => {
    // console.log(email, password)
    const hashedPassword = await encrypt(password)
    const otpGenerated = generateOTP()
    const newUser = await User({
        email: email,
        password: hashedPassword,
        otp: otpGenerated
    })
    await newUser.save().then((data) => {
        console.log(data, "DataInserted");
        return data;
    });
    if(!newUser) {
        return [false, 'Unable to sign you up']
    }
    try{
        await sendMail(
            email,
            otpGenerated
        )
        return [true, newUser]
    } catch(error) {
        return [false, 'Unable to sign up, Please try again later', error]
    }
}


const validateUserSignUp = async (email, otp) => {
    const user = await User.findOne({
        email,
    })
    if (!user){
        return[false, 'User not found']
    }
    if (user && user.otp !== otp){
        return[false, 'Invalid OTP']
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: {active: true}
    })
    return [true, updatedUser]
}