import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feebacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feeback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCases = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )
    await submitFeedbackUseCases.execute({
        type,
        comment,
        screenshot,
    })
    return res.status(201).send();
})