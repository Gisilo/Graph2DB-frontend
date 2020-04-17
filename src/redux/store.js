import { createStore } from 'redux';
import saveReducer from './reducers/SaveReducer';

const store = createStore(saveReducer);

export default store;