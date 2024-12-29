import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user-reducer';
import { cityReducer } from './reducers/city-reducer';
import { offersReducer } from './reducers/offers-reducer';
import { offerReducer } from './reducers/offer-reducer';
import { commentsReducer } from './reducers/comment-reducer';
import { Actions } from '../emuns/actions.enum';
import { favoritesReducer } from './reducers/favorites-reducer';

const reducer = combineReducers({
  [Actions.user]: userReducer,
  [Actions.city]: cityReducer,
  [Actions.offers]: offersReducer,
  [Actions.offer]: offerReducer,
  [Actions.comment]: commentsReducer,
  [Actions.favorites]: favoritesReducer
});

export { reducer };
