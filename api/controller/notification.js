const { sendEmail } = require("../common/mail");
const connectionSchema = require("../models/connections");

const notification = async(req, res) =>{
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

module.exports = {
    notification
};