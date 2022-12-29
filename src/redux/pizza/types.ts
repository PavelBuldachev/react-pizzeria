export type PizzaItem = {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    category: number;
    rating: number;

}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
  
export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}
