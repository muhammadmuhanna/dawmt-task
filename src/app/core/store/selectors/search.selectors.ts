import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/index';
export const selectSearchState = (state: AppState) => state.search;
export const selectSearchValue = createSelector(
  selectSearchState,
  search => search.value
);
