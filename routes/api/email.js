const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

// router.get('/', (req, res) => {
//     res.render("welcome", {
//         title: "Hi, Raluca",
//         message:
//         "Thank you for registering!",
//         secondMessage: "Please click on the below link to activate your account.",
//         linkName: "Activate Account",
//         linkTo: "http://localhost:3000/",
//     });
// })

const sendMail = (transporter, options, res) => {
    transporter.sendMail(options, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Failed To Send Email",
                err: { errors: err, options },
            });
        } else {
            res.status(200).json({
                status: "success",
            });
        }
    });
}

const setAccount = (account) => {
    const { email, password } = account;
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password,
        },
    });
}

router.post("/", (req, res) => {
    const { name = 'Raluca', email = 'ralucamavriche@gmail.com', linkTo = 'www.google.com',title = 'Welcome Email',details='Thank you for registering!'  } = req.body;
    const templateToUse = "welcome"
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'blood.donation.management.free@gmail.com',
            pass: 'primavara18',
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    const useTemplate = fs.readFileSync(path.join(__dirname, `../../views/${templateToUse}.hbs`), "utf8");

    const template = Handlebars.compile(useTemplate);

    let mailOptions = {
        from: "blood.donation.management.free@gmail.com",
        to: email,
        subject: title,
        html: template({
            title: `Hi ${name}`,
            message: details
        }),
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Failed To Send Email",
                err: { errors: err, mailOptions },
            });
        } else {
            res.status(200).json({
                status: "success",
            });
        }
    });
});




module.exports = router;
