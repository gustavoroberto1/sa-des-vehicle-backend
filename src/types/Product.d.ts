type CreateProductRequest = {
    name: string;
    description: string;
    category: string;
    amount: number;
    markId: string;
}

type UpdateProductRequest = {
    productId: string,
    amount: number
}