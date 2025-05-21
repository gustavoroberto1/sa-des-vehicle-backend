
import { Mark, User } from "@prisma/client";
import { prisma } from "../prisma/client";

class MarkService {
    public async register({ name }: MarkRequest): Promise<void> {
        const markExist = await prisma.mark.findUnique({
            where: { name }
        })

        if (markExist) {
            throw new Error("Marca já cadastrada")
        }


        const mark: Mark = {
            id: crypto.randomUUID(),
            name: name,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await prisma.mark.create({ data: mark })
    }


    public async getAll() {
        return await prisma.mark.findMany()
    }
}

export const markService = new MarkService();

