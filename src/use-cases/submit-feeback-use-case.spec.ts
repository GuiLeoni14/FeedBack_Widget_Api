import { SubmitFeedbackUseCase } from "./submit-feeback-use-case";

const createFeedbackSpy = jest.fn();
const sendFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create:  createFeedbackSpy},
    { sendMail: sendFeedbackSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'NADA',
            screenshot: 'data:image/png;base64foto.png'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendFeedbackSpy).toHaveBeenCalled();
    })
    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'NADA',
            screenshot: 'data:image/png;base64foto.png'
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64foto.png'
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'BUGADO',
            screenshot: 'data:base64foto.png'
        })).rejects.toThrow();
    })
})