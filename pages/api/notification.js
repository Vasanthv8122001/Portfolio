// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { reachOutMail } from '@/template/reachOutMail';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {

        const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body

        if (!fullName || !emailAddress || !mobileNumber || !emailSubject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const subject = req?.body?.emailSubject;
        const text = req?.body?.message;

        if(!subject?.trim()){
            return res.status(400).json({ error: 'Subject required' });
        }
        if(!text?.trim()){
            return res.status(400).json({ error: 'Message required' });
        }
        if(!emailAddress?.trim()){
            return res.status(400).json({ error: 'Mail id required' });
        }
        if(!mobileNumber?.trim()){
            return res.status(400).json({ error: 'MObile number required' });
        }
        if(!fullName?.trim()){
            return res.status(400).json({ error: 'Name required' });
        }

        // let newUser = new connectionSchema({
        //     fullName: fullName,
        //     emailAddress: emailAddress,
        //     mobileNumber: mobileNumber,
        //     subject: subject,
        //     text: text
        // });
        // newUser = await newUser.save()
        // console.log("newUser", newUser);

        const sentMail = await sendEmail(subject, text, emailAddress, mobileNumber, fullName);

        if(sentMail){
            return res.status(200).json({ message: 'Email sent successfully' });
        } else{
            return res.status(500).json({ error: 'Failed to send email' });
        }

    } catch (error) {
        console.log('error in notification controller', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const sendEmail = async(subject, text, emailAddress, mobileNumber, fullName) => {
    try {
        console.log("req_sendEmail", subject, text, emailAddress, mobileNumber, fullName);
        // const subject = re q?.body?.emailSubject;
        // const text = req?.body?.message;
        // const emailAddress = req?.body?.emailAddress;
        // const mobileNumber = req?.body?.mobileNumber
        // const fullName = req?.body?.fullName

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS
            }
        });

        const mailOptions = {
            from: emailAddress, // Change this to the sender's email address
            to: process.env.NEXT_PUBLIC_EMAIL_USER, // Change this to the recipient's email address
            subject: subject,
            text: text,
            html: reachOutMail(fullName, mobileNumber, emailAddress, text) // Optional: HTML version of the email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        
        return true
    } catch (error) {
        console.error('Error sending email:', error);
    }
}