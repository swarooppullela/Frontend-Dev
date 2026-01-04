import { createAction } from '@reduxjs/toolkit';
import { IProductList } from '@/types.js';
import { GET_PRODUCT_LIST, SORT_ORDER } from '@/constants.js';

export const FETCH_PRODUCT_LIST = (data: unknown) => ({
    type: GET_PRODUCT_LIST,
    payload: data,
});

// OR

export const GET_PRODUCTS = createAction<IProductList>(GET_PRODUCT_LIST);

export const SORT_DATA = createAction<string>(SORT_ORDER);