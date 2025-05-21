import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { markService } from "../service/MarkService";

export async function markController(app: FastifyInstance) {

    app.post("/mark", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as MarkRequest;

        try {
            await markService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/mark", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await markService.getAll()
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}