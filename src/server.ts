import express, { response } from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json())
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "61cbcd8c66a2d8",
      pass: "b4a969f03aea32"
    }
});
app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const feedback = await prisma.feedBack.create({
        data: {
            type,
            comment,
            screenshot,
        }
    });
    await transport.sendMail({
        from: 'Equipe Fidget <opa@gmail.com>',
        to: 'Guilherme <gui@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n'),
    })
    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => console.log('SERVER ON!'));