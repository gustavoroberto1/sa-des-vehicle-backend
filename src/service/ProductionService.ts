
import { ProductCategory, Production } from "@prisma/client";
import { prisma } from "../prisma/client";
import { CreateProductionRequest } from "../types/Production";
import { convertColorToString, convertToColor } from "../util/convertColor";
import { convertOptionalToString, convertToOptional } from "../util/convertOptional";

class ProductionService {
    public async register({ modelId, amount, color, optional }: CreateProductionRequest): Promise<void> {

        const model = await prisma.model.findUnique({
            where: { id: modelId },
            include: {
                ProductModel: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!model) {
            throw new Error("Modelo não existe...");
        }

        const motor = model.ProductModel.find(item => item.product.category === ProductCategory.MOTOR);
        const pneu = model.ProductModel.find(item => item.product.category === ProductCategory.PNEU);
        const battery = model.ProductModel.find(item => item.product.category === ProductCategory.ELETRICO);

        if (!motor || !pneu || !battery) {
            throw new Error("Produtos obrigatórios não vinculados");
        }


        const enoughProducts = motor.product.amount < amount && battery.product.amount < amount && pneu.product.amount < (5 * amount);
        if (enoughProducts) {
            throw new Error("Não existe produtos suficientes para essa quantidade de modelos")
        }

        const production: Production = {
            id: crypto.randomUUID(),
            modelId: modelId,
            amount: amount,
            color: convertToColor(color),
            optional: optional.map(op => convertToOptional(op)),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        await prisma.$transaction([
            prisma.production.create({ data: production }),
            prisma.product.update({ where: { id: motor.product.id }, data: { amount: { decrement: amount } } }),
            prisma.product.update({ where: { id: pneu.product.id }, data: { amount: { decrement: (5 * amount) } } }),
            prisma.product.update({ where: { id: battery.product.id }, data: { amount: { decrement: amount } } }),
        ])
    }

    public async getAll() {
        const productions = await prisma.production.findMany({
            include: {
                model: true
            }
        });

        return productions.map(production =>  ({
            id: production.id,
            model: production.model.name,
            color: convertColorToString(production.color),
            amount: production.amount,
            optional: production.optional.map(o => convertOptionalToString(o)),
            createdAt: production.createdAt,
            updatedAt: production.updatedAt
        }))

    }
}

export const productionService = new ProductionService();
