import { createAction, props } from '@ngrx/store';
export const setSearchValue = createAction(
  '[Search] Set Search Value',
  props<{ value: string }>()
);
