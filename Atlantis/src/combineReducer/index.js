/* eslint-disable prettier/prettier */
// Imports: Dependencies
import { combineReducers } from 'redux';
import homeReducer from '../screens/home/reducer';


const rootReducer = combineReducers({
  home: homeReducer,
  });
export default rootReducer;