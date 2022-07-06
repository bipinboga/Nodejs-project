const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
var secret = speakeasy.generateSecret({
  name: "Bipins_Authentication",
});

exports.generateQRcode = async (req, res) => {
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "QR CODE Generated",
      data: {
        Qrcode: data,
        secret: secret.base32,
      },
    });
  });
};

exports.TOTPValid = async (req, res) => {
  const { TOTP, SECRET } = req.body;
  var verified = speakeasy.totp.verify({
    secret: SECRET,
    encoding: "base32",
    token: TOTP,
    window: 0,
  });
  console.log(verified);
  if (verified) {
    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Verified Success",
      data: {},
    });
  } else {
    return res.status(400).json({
      statuscode: 400,
      status: "OK",
      message: " Fail",
      data: {},
    });
  }
};
