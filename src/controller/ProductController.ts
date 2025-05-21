import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productService } from "../service/ProductService";

export async function productController(app: FastifyInstance) {

    app.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProductRequest;

        try {
            await productService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.patch("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpdateProductRequest;

        try {
            await productService.updateAmount(body)
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await productService.getAll()
            return reply.code(200).send(products);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}