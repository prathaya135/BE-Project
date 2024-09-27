const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bprathamesh135@gmail.com',
        pass: 'gmsq klyx bvny turb',
    },
});

function sendReminderMail(toEmail) {
    let mailOptions={
        from:'bprathamesh135@gmail.com',
        to:toEmail,
        subject: "We Miss You!",
        html:`<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #5f9ea0;">👋 We Miss You!</h2>
      
      <p>It's been more than 5 hours since you last logged in. Come back and check out what's new!</p>
      
      <div style="text-align: center;">
        <a href="http://localhost:3000/" style="background-color: #5f9ea0; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">Login Now</a>
      </div>

      <p style="text-align: center; margin-top: 20px;">
        <img src="https://example.com/your-image.jpg" alt="Reminder" style="max-width: 100%; height: auto;">
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">

      <p style="text-align: center; font-size: 12px; color: #777;">
        If you have any questions, feel free to <a href="mailto:support@your-website.com" style="color: #5f9ea0;">contact us</a>.<br>
        &copy; 2024 Your Company, Inc. All rights reserved.
      </p>
    </div>`
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:'+info.response);
        }
    });
    
};

module.exports={sendReminderMail};