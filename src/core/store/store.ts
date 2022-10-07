import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  RehydrateAction,
} from "redux-persist";
import { rtkQueryErrorLogger } from "./middlewares";

import reducers, { storeMiddlewares, whitelist } from "./reducers";
import storage from "./storage";

const persistConfig = {
  key: "primary",
  storage,
  whitelist, // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

export function makeStore() {
  const _store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(rtkQueryErrorLogger)
        .concat(storeMiddlewares),
  });
  const _persistor = persistStore(_store);

  return { store: _store, persistor: _persistor };
}

export const { store, persistor } = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Rehydarte action type
export interface IRehydrateAppAction extends RehydrateAction {
  payload?: AppState;
}
