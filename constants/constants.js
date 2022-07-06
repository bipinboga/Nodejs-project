require('dotenv/config')
require('dotenv').config();

module.exports = {
    allowedOrigins: ['http://localhost:3000/'],
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_DB_URI: process.env.MONGODB_URL_LOCAL,
    JWT_SECRET: 'thisIsASimpleTest',
    OTP_LENGTH: 6,
    OTP_CONFIG: {
        numbers: true,
        specialChars: false,
    },

    MAIL_SETTINGS: {
        host:'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
        },
    }
}
