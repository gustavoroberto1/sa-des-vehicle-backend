
import { Product, ProductCategory } from "@prisma/client";
import { prisma } from "../prisma/client";
import { convertProductCategoryToString, convertToProductCategory } from "../util/convertCategoryType";

class ProductService {
    private OS: number = 0;

    public async register(data: CreateProductRequest): Promise<void> {
        const mark = prisma.mark.findUnique({ where: { id: data.markId } })
        if (!mark) {
            throw new Error("Marca não existe!!!")
        }


        const product: Product = {
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description,
            amount: data.amount,
            markId: data.markId,
            category: convertToProductCategory(data.category),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await prisma.product.create({ data: product })
    }


    public async updateAmount({ amount, productId }: UpdateProductRequest) {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new Error("Produto não existe!!!")
        }

        await prisma.product.update({
            where: { id: productId },
            data: { amount: product.amount + amount }
        },)

    }

    public async getAll() {
        const products = await prisma.product.findMany({
            include: {
                mark: true
            }
        })

        return products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            category: convertProductCategoryToString(product.category),
            mark: product.mark.name,
            amount: product.amount,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }))
    }
}

export const productService = new ProductService();

