import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityService } from "../service/QualityService";
import { convertToStatus } from "../util/convertStatus";

export async function qualityController(app: FastifyInstance) {

    app.patch("/quality", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as AvailableQualityRequest;
        const { id } = request.params as { id: string };

        try {
            await qualityService.available(id, body)
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/quality", async (request: FastifyRequest, reply: FastifyReply) => {
        const { status } = request.query as { status: string };
        try {
            const marks = await qualityService.getByStatus(convertToStatus(status))
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}