const nodemailer = require('nodemailer');
const generateConfirmationToken = require('./tokenService');

const sendConfirmationEmail = async (email, userId) => {
    const confirmationToken = generateConfirmationToken(userId);
    
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

    const confirmationURL = `http://localhost:3003/confirm-email?token=${confirmationToken}&userId=${userId}`;


    const mailOptions = {
        from: 'bprathamesh135@gmail.com',
        to: email,
        subject: 'Email Confirmation from SignHelpers',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
                <h2 style="color: #333;">Email Confirmation</h2>
                <p style="font-size: 16px;">
                    Dear User,
                </p>
                <p style="font-size: 16px;">
                    Thank you for registering with us! Please confirm your email address by clicking on the link below:
                </p>
                <p style="text-align: center;">
                    <a href="${confirmationURL}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 15px;">
                        Confirm Email
                    </a>
                    
                    <a href="http://localhost:3000/" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Website Link
                    </a>
                </p>
                <p style="font-size: 16px;">
                    If you did not create an account, you can ignore this email.
                </p>
                <p style="font-size: 16px;">
                    Best regards,<br />
                    Your Company Name
                </p>
            </div>
        `,
    };
    

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

module.exports = sendConfirmationEmail; 
