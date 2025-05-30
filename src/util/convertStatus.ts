import { ProductCategory, Status } from "@prisma/client";

export function convertToStatus(status: string) {
    console.log(status)
    const statusCleaner = status.trim().toLowerCase();
    switch (statusCleaner) {
        case "pendente": return Status.PENDENTE
        case "reprovado": return Status.REPROVADO
        case "aprovado": return Status.APROVADO
        case "em manutenção": return Status.EM_MANUTENCAO
        case "pendente de avaliação": return Status.PENDENTE_VALIDACAO
        default: return Status.PENDENTE
    }
}

export function convertStatusToString(status: Status) {
    switch (status) {
        case Status.PENDENTE: return "Pendente"
        case Status.REPROVADO: return "Reprovado"
        case Status.APROVADO: return "Aprovado"
        case Status.EM_MANUTENCAO: return "Em Manutenção"
        case Status.PENDENTE_VALIDACAO : return "Pendente de Validação"
    }
}