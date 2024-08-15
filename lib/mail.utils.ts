import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter =
  nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  } as SMTPTransport.Options);

type SendEmailDto = {
  sender: Mail.Address;
  receiver: Mail.Address;
  subject: string;
  message: string;
};

export const sendEmail = async (
  dto: SendEmailDto
) => {
  const {
    sender,
    receiver,
    subject,
    message,
  } = dto;
  return await transporter.sendMail({
    from: sender,
    to: receiver,
    subject,
    html: message,
    text: message,
  });
};
