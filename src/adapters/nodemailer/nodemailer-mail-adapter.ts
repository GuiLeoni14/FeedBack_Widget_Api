import { IMailAdapter, ISendEmailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "61cbcd8c66a2d8",
      pass: "b4a969f03aea32"
    }
});
export class NodemailerMailAdapter implements IMailAdapter{
    async sendMail({subject, body}: ISendEmailData){
        await transport.sendMail({
            from: 'Equipe Fidget <opa@gmail.com>',
            to: 'Guilherme <gui@gmail.com>',
            subject,
            html: body,
        })
    };
}