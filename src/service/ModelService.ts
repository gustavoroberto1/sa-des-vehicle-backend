
import { Model } from "@prisma/client";
import { prisma } from "../prisma/client";

class ModelService {
    public async register(data: CreateModelRequest): Promise<void> {
        const products = await prisma.product.findMany({
            where: {
                id: { in: [data.batteryId, data.motorId, data.pneuId] }
            }
        })

        if (products.length != 3) {
            throw new Error("Alguns dos produtos está incorreto!")
        }

        const model: Model = {
            id: crypto.randomUUID(),
            name: data.name,
            numberOfPorts: data.numberOfPorts,
            fuelType: data.fuelType,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await prisma.$transaction([
            prisma.model.create({ data: model }),

            prisma.productModel.createMany({
                data: [
                    { modelId: model.id, productId: data.motorId },
                    { modelId: model.id, productId: data.pneuId },
                    { modelId: model.id, productId: data.batteryId }
                ]
            })
        ])
    }

    public async getAll() {
        return await prisma.model.findMany();
    }

}

export const modelService = new ModelService();

