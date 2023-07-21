import { OptionsForNodemailer } from '../types';

import nodemailer from 'nodemailer';

const sendEmail = async (options: OptionsForNodemailer): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: 'Phil Gevorgyan <hello@phil.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
