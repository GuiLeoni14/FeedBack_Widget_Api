export interface ISendEmailData{
    subject: string;
    body: string;
}
export interface IMailAdapter {
    sendMail: (data: ISendEmailData) => Promise<void>;
}