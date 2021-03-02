import { combineReducers } from 'redux';
import foodsMenu from './foodsMenu';
import orders from './orders';
import employees from './employees';

export default combineReducers({ foodsMenu, orders, employees });