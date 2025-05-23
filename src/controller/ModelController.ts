import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { modelService } from "../service/ModelService";

export async function modelController(app: FastifyInstance) {

    app.post("/model", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateModelRequest;

        try {
            await modelService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/model", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await modelService.getAll()
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}