import { ActionReducerMap } from '@ngrx/store';
import * as fromSearch from './search.reducer';

export interface AppState {
  search: fromSearch.SearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  search: fromSearch.searchReducer
};
