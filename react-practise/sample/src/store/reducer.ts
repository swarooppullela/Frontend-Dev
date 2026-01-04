export interface IState {
    productList: any | null;
    sortOrder: string;
}

const initialState: IState = {
    productList: null,
    sortOrder: '',
}

export interface IReducer<T> {
    type: string,
    payload: T | null 
}



export const sampleReducer = <T>(state = initialState, action: IReducer<T>) => {
    switch (action.type) {
        case 'GET_PRODUCT_LIST':
            return {
                ...state,
                productList: action.payload
            };
        case 'SORT_ORDER':
            return {
                ...state,
                sortOrder: action.payload as string
            };
        default:
            return state;
    }
}