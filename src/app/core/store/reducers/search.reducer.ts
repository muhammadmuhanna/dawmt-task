import { createReducer, on } from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';

export interface SearchState {
  value: string;
}

export const initialState: SearchState = {
  value: ''
};
export const searchReducer = createReducer(
  initialState,
  on(SearchActions.setSearchValue, (state, { value }) => ({ ...state, value }))
);
