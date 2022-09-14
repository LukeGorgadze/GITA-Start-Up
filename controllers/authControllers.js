const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const maxAge = 3 * 24 * 60 * 60;
require('dotenv').config();

const nodemailer = require("nodemailer");
const { google } = require("googleapis")
const config = require("../config.js")
const OAuth2 = google.auth.OAuth2

const bcrypt = require("bcrypt")

const user = process.env.USER
const pass = process.env.PASS
console.log(user, pass)

const oAuth2_client = new OAuth2(config.clientId, config.clientSecret)
oAuth2_client.setCredentials({ refresh_token: config.refreshToken })

function send_mail(name, recipient,token) {
    const accessToken = oAuth2_client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: user,
            pass: pass,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken
        },
    });

    const mail_options = {
        from: "Lim01 Gita-Start-Up",
        to: recipient,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
                <h2>Hello ${username}</h2>
                <p>Thank you for using our application. Please confirm your email by clicking on the following link</p>
                <a href=https://lim01.herokuapp.com/api/auth/confirm/${token}> Click here</a>
                <h2>გამარჯობა ${username}</h2>
                <p>მადლობა რომ იყენებთ ჩვენს ვებ-აპლიკაციას, გთხოვთ დაადასტუროთ თქვენი მეილი და დააჭიროთ ლინკს</p>
                <a href=https://lim01.herokuapp.com/api/auth/confirm/${token}> Click here</a>
                </div>`,
    }

    transport.sendMail(mail_options, function (error, result) {
        if (error) {
            console.log("Error", error)
        } else {
            console.log('Success')
        }
        transport.close()
    })

}



const createToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

const handleErrors = (err) => {
    let errors = { username: "", email: "", password: "", status: "" };

    console.log(err);
    if (err.status === "Pending Account. Please Verify Your Email!") {
        errors.status = "Pending Account. Please Verify Your Email!";
    }
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered, dude... really?";
    }

    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect, come on... xDD";
    }
    if (err.message === "Password required") {
        errors.password = "Password required";
    }
    if (err.code === 11000) {
        if (err.keyValue.username) {
            errors.username = "Username is already registered, choose different one dummy!"
        }
        else if (err.keyValue.email) {
            errors.email = "Email is already registered, choose different one dummy!"
        }

    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}



module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!password) {
            throw Error("Password required");
        }
        const token = createToken(email);
        const salt = await bcrypt.genSalt(10);
        const ps = await bcrypt.hash(password, salt)
        const user = await UserModel.create({ username: username, email: email, password: ps, confirmationCode: token })

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })

        send_mail("Lim01",email,token)
        // transport.sendMail({
        //     from: "Lim01 Gita-Start-Up",
        //     to: email,
        //     subject: "Please confirm your account",
        //     html: `<h1>Email Confirmation</h1>
        //         <h2>Hello ${username}</h2>
        //         <p>Thank you for using our application. Please confirm your email by clicking on the following link</p>
        //         <a href=http://localhost:3000/api/auth/confirm/${token}> Click here</a>
        //         <h2>გამარჯობა ${username}</h2>
        //         <p>მადლობა რომ იყენებთ ჩვენს ვებ-აპლიკაციას, გთხოვთ დაადასტუროთ თქვენი მეილი და დააჭიროთ ლინკს</p>
        //         <a href=http://localhost:3000/api/auth/confirm/${token}> Click here</a>
        //         </div>`,
        // }).catch(err => console.log(err));

        res.status(201).json({ user: user.email, created: true })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        res.json({ errors, created: false })
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.login(email, password)
        const token = createToken(user.email);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
        res.status(200).json({ username: user.username, mail: user.email, created: true })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        res.json({ errors, created: false })
    }
};