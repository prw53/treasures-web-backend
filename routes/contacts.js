var express = require('express');
var router = express.Router();
//var Contact = require('../models/Contacts');
//const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//form.use(bodyParser.json());
//form.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'marianna77@ethereal.email',
                pass: 'QtFcCtBVPYRReJhRWS'
            }
        })

        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'peter.waller53@gmail.com',
            replyTo: 'test@testaccount.com',
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }

            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
});




//router.post('/Contact', function (req, res) {
//    const newContact = new Contact({
//        name: req.body.name,
//        email: req.body.email,
//        comment: req.body.message,
//    });
//    newContact
//        .save()
//        .then((data) => { res.json(data); })
//        .catch((error) => { res.json(error); });
//});

module.exports = router;