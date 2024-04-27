export interface StateType {
    currentYear?: number;
    indexContext?: number;
    defaultYear?: number;
    year?: number | null;
    years?: number[]|undefined;
    prefixY?: number;
    suffixY?: number;
  }
  
  export interface ActionType {
    type: 'SCROLL_UP' | 'SCROLL_DOWN';
    payload?: number;
  }
  
  export const initialPageState: StateType = {
    defaultYear: 2012,
    prefixY: 2012,
    suffixY: 2012,
    years:[2012]
  };
  
  function pageReducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
      case 'SCROLL_UP':
        return {
          ...state,
         prefixY: Number(state.prefixY)  - 1,
        //@ts-ignore
         years:[ Number(state.prefixY)  - 1,...state.years]
        };
      case 'SCROLL_DOWN':
        return {
          ...state,
          suffixY: Number(state.prefixY)  + 1,
          //@ts-ignore
         years:[...state.years, Number(state.suffixY)  + 1]
        };
      default:
        return state;
    }
  }
  
  export default pageReducer;
  