import { errorResponse } from '@/shared';
import nodemailer from 'nodemailer';

type IEmailItems = {
  to: string;
  subject: string;
  text?: string;
  html: string;
};

export class SendMail {
  async execute({ to, subject, html, text }: IEmailItems): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "pnclique@gmail.com", //process.env.EMAIL_USER,
          pass: "ooboivoyvcyeebtr" //process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        // from: `Qeys <${process.env.EMAIL_USER}>`,
        from: `Qeys <${"no-replay@qeys.ao"}>`,
        to,
        subject,
        html,
        text,
      });
      return true;
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
