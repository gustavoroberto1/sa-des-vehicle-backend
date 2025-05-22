import { ProductCategory } from "@prisma/client";

export function convertToProductCategory(type: string) {
    const typeCleaner = type.trim().toLowerCase();
    switch (typeCleaner) {
        case "motor": return ProductCategory.MOTOR
        case "pneu": return ProductCategory.PNEU
        case "elétrico": return ProductCategory.ELETRICO
        case "acessórios": return ProductCategory.ACESSORIOS
        default: return ProductCategory.OUTROS
    }
}

export function convertProductCategoryToString(productCategory: ProductCategory){
    switch(productCategory){
        case ProductCategory.MOTOR: return "Motor";
        case ProductCategory.PNEU: return "Pneu";
        case ProductCategory.ELETRICO: return "Elétrico";
        case ProductCategory.ACESSORIOS: return "Acessórios";
        case ProductCategory.OUTROS: return "Outros";
    }
}