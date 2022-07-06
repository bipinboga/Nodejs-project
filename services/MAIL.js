const nodemailer = require('nodemailer')
const {MAIL_SETTINGS} = require('../constants/constants')
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (email, OTP) => { 
    console.log(email,OTP)
try{
    let mailOptions = {
        from: MAIL_SETTINGS.auth.user,
        to: email,
        subject: 'Hello',
        html: `
        <div class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px" 
        >
            <h2>Welcome to the club.</h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px;text-align:center;">${OTP}</h1>
        </div>`,
      };
  
      let info = await transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Message sent')
    })
      return { error: false };
} catch(error) {
    console.log(error)
    return false
}
}