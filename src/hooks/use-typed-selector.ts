import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

/*
  Whenever we want to access state inside of a component, use useTypedSelector, which understands 
  the data that is stored in the store. By default, if we make use of the useSelector hook from react-redux,
  we don't get any typings coming out of our redux store. In other words, we don't know what type of data we're accessing. 
*/
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;