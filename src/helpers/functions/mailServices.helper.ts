import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pnclique@gmail.com",  //process.env.EMAIL_USER,
        pass: "ooboivoyvcyeebtr" //process.env.EMAIL_PASS,
    },
});