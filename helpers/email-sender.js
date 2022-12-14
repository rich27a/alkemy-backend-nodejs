// Use at least Nodemailer v4.1.0
const nodemailer = require("nodemailer");

const sendEmail = async (emailDestination, name) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //Se puede configurar con GMAIL
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Alkemy 👻" <testAlkemy@test.com>`, // sender address
    to: `${emailDestination}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Gracias por registrarte al mundo de disney por alkemy", // plain text body
    html: `<b>Bienvenido ${name} al mundo de disney por Alkemy</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendEmail;
