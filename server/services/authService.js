const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRepo = require('../repositories/authRepo');
const UserRepo = require('../repositories/userRepo');
const { emailValid, passwordValid } = require('../utilities/validations/validations');
const nodeMailer = require('nodemailer');
const { cookieParse } = require('../utilities/cookieParse/cookieParse')
const { transferMail } = require('../utilities/mailer/mailer');
const {convertToReadingPossibility} =require('../utilities/adjustingData/adjustungPostData')

const auth = async (req, res) => {
    try {
        console.log(req.headers.cookie);
        const cookie = req.headers.cookie || null
        if (!cookie || cookie === undefined) {
            return false;
        }
        const obj = cookieParse(cookie)
        if (!obj) {
            throw new Error("couldn't parse cookie");
        }
        const isVarify = jwt.verify(obj.token, process.env.SECRET_KEY);
        if (isVarify.email) {
            console.log(true);
        }
        return true
    }
    catch (err) {
        console.log(err);
        return err
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ((!email || !emailValid(email)) || (!password || !passwordValid(password))) { throw Error('auth faild') }

        const answer = await AuthRepo.logIn(email);

        if (answer.message) {
            throw new Error('email or password are not correct');
        }
        const isComparePassword = await bcrypt.compare(password, answer.password);
        console.log(isComparePassword);
        if (!isComparePassword) {
            throw new Error('email or password are not correct');
        }
        const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });

        res.cookie(process.env.TOKEN_NAME, accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false
        })

        return {
            id: answer.id,
            name: answer.name,
            email: answer.email,
            country: answer.country,
            languages: answer.languages,
            phone_number: answer.phone_number,
            age: answer.age,
            about: answer.about || null,
            posts: (answer.posts && answer.posts.map((post) => { return convertToReadingPossibility(post) })) || null,
            subjects: answer.subjects || null,
        }
    }
    catch (err) {
        console.log(err);
        return err;
    }

}


const forgetPassword = async (reqBody) => {
    try {
        const { email } = reqBody;
        if (!email) {
            throw Error('please send email');
        }
        else if (!emailValid(email)) {
            throw Error('email not valid');
        }
        const user = await UserRepo.getOneUser(email);
        if (!user) {
            throw Error('email not macth please try again');
        }
        const newPass = Math.random().toString(36).slice(2, 8);
        const emailDestination =user.email;
        const titleMessage ='temporary code from study partner'; 
        const bodyMessage =`<div>
        <h4>hii avi! </h4>
        <p>your temporary password is: ${newPass}  please do not share this password to anybody.. 
        have a nice day !!</p>
        </div>`;
        // const bodyMessage =`your temporary password is: ${newPass}  please do not share this password to anybody`
        const sendMail = transferMail(emailDestination,titleMessage,'',bodyMessage);   
        console.log(sendMail);
    }
    catch (err) {
        console.log(err);
        return err
    }

    // try {
    //     const { email } = reqBody;
    //     if (!email) {
    //         throw Error('please send email');
    //     }
    //     else if (!emailValid(email)) {
    //         throw Error('email not valid');
    //     }
    //     const user = await UserRepo.getOneUser(email);
    //     if (!user) {
    //         throw Error('email not macth please try again');
    //     }
    //     const newPass = Math.random().toString(36).slice(2, 8);
    //     const mailTransporter = await nodeMailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.EMAIL_URL,
    //             pass: process.env.EMAIL_PASS,
    //         }
    //     });
    //     mailTransporter.sendMail(
    //         {
    //             from: 'study-partner',
    //             to: user.email,
    //             subject: 'code from study partner',
    //             text: `your temporary password is: ${newPass}  please do not share this password to anybody`
    //         },
    //         async (err, data) => {
    //             if (err) {
    //                 throw new Error('err to send')
    //             }
    //             const answer = UserRepo.updateUser(email, { refresh_token: newPass });
    //             // console.log(data);
    //             return answer;
    //         })
    // }
    // catch (err) {
    //     console.log(err);
    //     return err
    // }
}

const resetPassword = async (reqBody) => {
    try {
        const { code, password, confirmPassword } = reqBody;

        if (!code || !password || !confirmPassword) {
            throw new Error('please fill all the fields');
        }

        else if (!passwordValid(password)) {
            throw new Error('password not valid');
        }

        else if (password !== confirmPassword) {
            throw new Error('passwords not match');
        }
        const hashPssword = bcrypt.hashSync(password, BCRYPT_ROUNDS);
        const answer = await AuthRepo.resetPassword(code, hashPssword);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    logIn,
    auth,
    forgetPassword,
    resetPassword
}