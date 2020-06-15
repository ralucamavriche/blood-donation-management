const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

router.get('/', (req, res) => {
    res.render("welcome", {
        title: "Hi, Raluca",
        message:
        "Thank you for registering!",
        secondMessage: "Please click on the below link to activate your account.",
        linkName: "Activate Account",
        linkTo: "http://localhost:3000/",
    });
})

const sendMail = (transporter, options, res) => {
    transporter.sendMail(options, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Imposible To Send Email",
                err: { errors: err, options },
            });
        } else {
            res.status(200).json({
                status: "Mail Send Successfully",
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
    const { name = 'Raluca', email = 'ralucamavriche@gmail.com', linkTo = 'www.google.com'  } = req.body;
    const templateToUse = "welcome"
    const accountInfo = {
        email: 'blood.donation.free@gmail.com',
        password: 'Blood.donation20'
    }
    let transporter = setAccount(accountInfo)

    const useTemplate = fs.readFileSync(path.join(__dirname, `../../views/${templateToUse}.hbs`), "utf8");

    const template = Handlebars.compile(useTemplate);

    let mailOptions = {
        from: "blood.donation.free@gmail.com",
        to: email,
        subject: "Welcome Email",
        html: template({
            title: `Hi, ${name}`,
            message: "Thank you for registering!",
            secondMessage: "Please click on the below link to activate your account.",
            linkName: "Activate Account",
            linkTo: linkTo,
        }),
    };
    sendMail(transporter, mailOptions, res);
});


// router.post("/", (req, res) => {
//     const { name = 'Raluca', email = 'gliga_dumitru@yahoo.com', linkTo = 'www.google.com'  } = req.body;
//     const templateToUse = "welcome"
//     const accountInfo = {
//         email: 'blood.donation.free@gmail.com',
//         password: 'Blood.donation20'
//     }
//     let transporter = setAccount(accountInfo)

//     const useTemplate = fs.readFileSync(path.join(__dirname, `../../views/${templateToUse}.hbs`), "utf8");

//     const template = Handlebars.compile(useTemplate);

//     let mailOptions = {
//         from: "blood.donation.free@gmail.com",
//         to: email,
//         subject: "Welcome Email",
//         html: template({
//             title: `Hi, ${name}`,
//             message: "Thank you for being a valued customer.",
//             secondMessage: "Please click on the below link to activate your account.",
//             linkName: "Activate Account",
//             linkTo: linkTo,
//         }),
//     };
//     sendMail(transporter, mailOptions, res);
// });

module.exports = router;
