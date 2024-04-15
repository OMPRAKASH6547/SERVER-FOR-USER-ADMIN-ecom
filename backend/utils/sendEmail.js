const nodemailer=require('nodemailer');
const sendEmail= async(options)=>{
    const transporter =nodemailer.createTransport({
         host:"smtp.gmail.com",
         port:465,
        service :process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD

        }
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:"rajk0723577@gmail.com",
        subject:options.subject,
        text:options.messages,
    }
    await transporter.sendMail(mailOptions)
}

module.exports=sendEmail