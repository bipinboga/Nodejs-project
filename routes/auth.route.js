const router = require('express').Router();
const registration = require('../controllers/registration');
const Google_2FA_Controller = require('../controllers/2faGoogle');

router.post('/', registration.signUpUser)
router.post('/verify', registration.verifyEmail)
router.post('/generateQRcode',Google_2FA_Controller.generateQRcode);
router.post ('/TOTPValid', Google_2FA_Controller.TOTPValid);

module.exports = router;