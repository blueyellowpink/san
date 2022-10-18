export default interface OrderResponse {
    id: number;
    pair: string;
    price: number;
    initAmount: number;
    amount: number;
    orderSide: string;
    orderType: string;
    status?: string;
    createdAt?: any;
    updatedAt?: any;
}
