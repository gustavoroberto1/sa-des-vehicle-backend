import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateProductionRequest } from "../types/Production";
import { productionService } from "../service/ProductionService";

export async function productionController(app: FastifyInstance) {

    app.post("/production", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProductionRequest;

        try {
            await productionService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/production", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await productionService.getAll()
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}