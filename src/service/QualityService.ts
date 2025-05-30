
import { Mark, Status, User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { convertOptionalToString } from "../util/convertOptional";
import { convertColorToString } from "../util/convertColor";
import { convertStatusToString } from "../util/convertStatus";

class QualityService {
    public async available(id: string, data: AvailableQualityRequest): Promise<void> {
        const available = await prisma.quality.findUnique({ where: { id } });
        if (!available) {
            throw new Error("Avaliação não existe...")
        }

        let status = data.battery && data.motor && data.optional && data.pneu ? Status.APROVADO : Status.REPROVADO;

        const updatedQuality = {
            battery: data.battery,
            motor: data.motor,
            pneu: data.pneu,
            optional: data.optional,
            note: data.note,
            status: status,
            updatedAt: new Date()
        }

        await prisma.quality.update({ where: { id }, data: updatedQuality })
    }


    public async getByStatus(status: Status) {
        const statusFilter = status === Status.PENDENTE
            ? { in: [Status.PENDENTE, Status.PENDENTE_VALIDACAO] }
            : { equals: status };
        const qualities = await prisma.quality.findMany(
            {
                where: { status: statusFilter },
                include: {
                    production: {
                        include: {
                            model: true
                        }
                    }
                }
            })

        return qualities.map(quality => ({
            id: quality.id,
            production: {
                model: quality.production.model.name,
                color: convertColorToString(quality.production.color),
                amount: quality.production.amount,
                optional: quality.production.optional.map(item => convertOptionalToString(item))
            },
            status: convertStatusToString(quality.status),
            createdAt: quality.createdAt,
            updatedAt: quality.updatedAt,
        }))
    }
}

export const qualityService = new QualityService();

