import nodemailer from "nodemailer";

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.STMP_HOST || "smtp.gmail.com",
        port: process.env.STMP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.STMP__USER,
            pass: process.env.STMP_PASS,
        },
    });
};

export const sendInvoiceEmail = async ({
    to,
    subject,
    message,
    invoiceHtml,
    invoiceNumber,
}) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
          from: `"SK_Store" <${
            process.env.STMP_FROM || process.env.STMP_USER
          }>`,
          to,
          subject,
          text: message,
          html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #1e40af; margin: 0;">SK_Store - Invoice</h2>
                    </div>
                    
                    <div style="background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 16px;">
                            ${message.replace(/\n/g, "<br>")}
                        </p>
                    </div>
                    
                    <div style="background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        ${invoiceHtml}
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0;">
                            Thank you for choosing SK_Store!<br>
                            If you have any questions, please contact us at support@sk_store.com
                        </p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions); 
        console.log("Email sent : " , info.messageId); 
        return {
            success: true,
            messageId: info.messageId,
        }; 

    } catch (error) {
        console.error("Error sending email: ", email); 
        throw new Error("Failed to send email"); 
     }
};


export const sendEmail = async ({
    to,
    subject,
    message,
    html,
}) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"SK_Store" <${process.env.STMP_FROM || process.env.STMP_USER
                }>`,
            to,
            subject,
            text: message,
            html:
                html ||
                `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #1e40af; margin: 0;">Sk_Store</h2>
                </div>
                
                <div style="background-color: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <p style="color: #374151; line-height: 1.6;">
                        ${message.replace(/\n/g, "<br>")}
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        Thank you for choosing Sk_Store!<br>
                        If you have any questions, please contact us at support@sk_store.com
                    </p>
                </div>
                </div>
            
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);

        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    };
}; 

export default {
    sendInvoiceEmail,
    sendEmail,
}; 