import nodemailer from "nodemailer";

export const sendEmail = async (msg, client, title) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.PASS_FROM,
      }
      });
    
      try {
        // Manda la mail
        const mail = await transporter.sendMail({
          from: "StriveBlog <demario.schoen@ethereal.email>", // Mittente
          to: client, // Destinatario
          subject: title, // Oggetto
          html: msg, // Contenuto
        });
    
        // Andiamo a stampare l'id della mail inviata
        console.log(mail.messageId);
      } catch (err) {
        // Stampa l'errore
        console.log(err);
      }
}