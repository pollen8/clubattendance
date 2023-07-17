/// <reference path="../../global.d.ts"/>
import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import reducer from '../../reducers';

const store = configureStore({
  reducer: reducer,
})

// Export as any as I can't work out how to add Thunk middleware type definitions to the store.dispatch
export default store;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
