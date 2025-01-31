// import { combineReducers, configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
// import userReducer from './redux/user/userslice'
// import sessionStorage from 'redux-persist/es/storage/session'
// import persistReducer from 'redux-persist/es/persistReducer'
// import persistStore from 'redux-persist/es/persistStore'



// const rootReducer=combineReducers({
//     user: userReducer,

// })
// // persiter for storage local storeage not refresh data at the time of refresh


// const persistConfig = {
//     key: 'root',
//     storage:sessionStorage,
//   }

//   const persistedReducer = persistReducer(persistConfig, rootReducer)

//   export const store = configureStore({
//     reducer: {
//         persistedReducer,
//         middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware({
//               serializableCheck: false, // Disable serializable checks
//             }),

     

      
//     },
//   })

// export const persistor=persistStore(store)
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user/userslice';
import sessionStorage from 'redux-persist/es/storage/session';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist configuration for session storage
const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer, // Assign the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks
    }),
});

// Create the persistor
export const persistor = persistStore(store);
