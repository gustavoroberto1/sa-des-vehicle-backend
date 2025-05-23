import { Color, ProductCategory } from "@prisma/client";

export function convertToColor(type: string) {
    const typeCleaner = type.trim().toLowerCase();
    switch (typeCleaner) {
        case "preto": return Color.PRETO;
        case "prata": return Color.PRATA;
        case "branco": return Color.BRANCO;
        case "cinza": return Color.CINZA;
        case "vermelho": return Color.VERMELHO;
        default: return Color.BRANCO;
    }
}

export function convertColorToString(color: Color) {
    switch (color) {
        case Color.PRETO: return "Preto";
        case Color.PRATA: return "Prata";
        case Color.BRANCO: return "Branco";
        case Color.CINZA: return "Cinza";
        case Color.VERMELHO: return "Vermelho";
    }
}