import * as ItemActions from './item.action';
import { Item } from '../../models/item.model';
import { createReducer, Action, on } from '@ngrx/store';

export const itemFeatureKey = 'items';

export interface ItemState {
	error: any;
	items: Item[];
}

const items: Item[] = [];

export const initialState = {
	error: undefined,
	items
};

export const itemReducers = createReducer(
	initialState,
	on(ItemActions.addItem, (state, action) => {
		const { items } = state;
		const id = items[items.length - 1] ? items[items.length - 1].id + 1 : 1;
		const newItem = {
			...action.item,
			id
		};
		const newItems = [ ...items ];
		newItems.push(newItem);
		return {
			...state,
			items: newItems
		};
	}),
	on(ItemActions.removeItem, (state, action) => {
		const deleteItem = state.items.filter((item) => item.id !== action.id);
		return {
			...state,
			items: deleteItem
		};
	})
);

export function reducer(state: ItemState, action: Action) {
	return itemReducers(state, action);
}
