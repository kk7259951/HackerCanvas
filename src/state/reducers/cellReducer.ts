import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce((
  state: CellState = initialState, 
  action: Action
) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
      // above code is immer library's replacement for plain reducer's state update
      // return {
      //   ...state,
      //   data: { 
      //     ...state.data, 
      //     id: {
      //       ...state.data[id],
      //       content
      //     }
      //   }
      // };
    case ActionType.DELETE_CELL:
      // delete cell from data object
      delete state.data[action.payload]; 
      // delete cell id from order array
      state.order = state.order.filter(id => id !== action.payload);
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      // find index of moving cell and the position it's replacing
      const index = state.order.findIndex(id => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1; 
      // if element at targetIndex is defined, swap order of elements
      if (state.order[targetIndex]) {
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      }
      return state;
      
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: ''
      }

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(id => id === action.payload.id);

      (foundIndex < 0) 
        ? state.order.unshift(cell.id)
        : state.order.splice(foundIndex + 1, 0, cell.id);
      return state;

    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;