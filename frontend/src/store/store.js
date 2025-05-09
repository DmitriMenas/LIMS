// frontend/src/store.store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import orderReducer from './orders';
import sampleReducer from './samples'
import userReducer from './users';


//Root reducer
const rootReducer = combineReducers({
    session: sessionReducer,
    orders: orderReducer,
    samples: sampleReducer,
    users: userReducer
});

// Enhancer
let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// configureStore function
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;