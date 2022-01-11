import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

// helper hook that makes dispatching actions easier automatically binding all the action creators to the dispatch function
export const useActions = () => {
  const dispatch = useDispatch();
  /*
    useMemo is used to bind actionCreators to dispatch one time when the application first runs
    and not repeatedly after that. 
  */
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

/*
  const { updateCell } = useActions();
  updateCell('az83j', 'const a = 1;'); -> this will update the store
*/