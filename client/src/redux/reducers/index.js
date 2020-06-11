import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../reducers/authentication';

const persistConfig = { 
  key: 'root',
  storage,
  blacklist: ['auth']
};

const rootReducer = combineReducers({
      auth : authReducer,
  });

export default persistReducer(persistConfig, rootReducer);