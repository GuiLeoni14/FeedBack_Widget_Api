import { prisma } from "../../prisma";
import { IFeedbackCreateData, IFeedbacksRepository } from "../feedbakcs-repository";

export class PrismaFeedbackRepository implements IFeedbacksRepository{
    async create({ type, comment, screenshot }: IFeedbackCreateData){
        await prisma.feedBack.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    };
}