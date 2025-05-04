import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import flight from './flight';
import api from '../Services/Api/api';
import common from './Common';
import loader from './Loader';
import { weatherApi } from '../Services/Api/weather/index';
import { openSkyApi } from '../Services/Api/liveflight';
import { geoLocationApi } from '../Services/Api/geolocation/index';
import { earthquakeApi } from '../Services/Api/earthquake';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['common'],
};
const reducers = combineReducers({
  common,
  loader,
  flight,
  [weatherApi.reducerPath]: weatherApi.reducer,
  [openSkyApi.reducerPath]: openSkyApi.reducer,
  [geoLocationApi.reducerPath]: geoLocationApi.reducer,
  [earthquakeApi.reducerPath]: earthquakeApi.reducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      api.middleware,
      weatherApi.middleware,
      openSkyApi.middleware,
      geoLocationApi.middleware,
      earthquakeApi.middleware
    );
    return middlewares;
  },
});

const persistor = persistStore(store);
setupListeners(store.dispatch);
// types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
