import { IMailAdapter } from "../adapters/mail-adapter";
import { IFeedbacksRepository } from "../repositories/feedbakcs-repository";

interface ISubmitFeedbackUseCasesRequest {
    type: string;
    comment: string;
    screenshot?: string
}
export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: IFeedbacksRepository,
        private mailAdapter: IMailAdapter,
    ){}
    async execute(request: ISubmitFeedbackUseCasesRequest){
        const { type, comment, screenshot } = request;
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                    `<p>Tipo do feedback: ${type}</p>`,
                    `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join('\n'),
        })
    }
}