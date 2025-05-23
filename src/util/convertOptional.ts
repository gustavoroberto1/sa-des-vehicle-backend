import { Optional } from "@prisma/client";

export function convertToOptional(type: string): Optional {
    const typeCleaner = type.trim().toLowerCase();
    switch (typeCleaner) {
        case "ár-condicionado":
            return Optional.AR_CONDICIONADO;
        case "direção elétrica":
            return Optional.DIRECAO_ELETRICA;
        case "câmbio automático":
            return Optional.CAMBIO_AUTOMATICO;
        case "aro liga leve":
            return Optional.ARO_LIGA_LEVE;
        case "banco de couro":
            return Optional.BANCO_DE_COURO;
        case "câmera de ré":
            return Optional.CAMERA_DE_RE;

        default:
            return Optional.AR_CONDICIONADO;
    }
}

export function convertOptionalToString(optional: Optional): string {
    switch (optional) {
        case Optional.AR_CONDICIONADO: return "Ár-Condicionado";
        case Optional.DIRECAO_ELETRICA: return "Direção Elética";
        case Optional.CAMBIO_AUTOMATICO: return "Câmbio Automático";
        case Optional.ARO_LIGA_LEVE: return "Aro Liga Leve";
        case Optional.BANCO_DE_COURO: return "Bando de Couro";
        case Optional.CAMERA_DE_RE: return "Câmera de Ré";
    }
}