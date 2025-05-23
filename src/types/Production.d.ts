import { Color } from "@prisma/client";

type CreateProductionRequest = {
    modelId: string;
    color: string,
    amount: number;
    optional: string[]
}