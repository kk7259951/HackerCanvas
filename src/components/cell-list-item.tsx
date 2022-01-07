import './cell-list-item.css';
import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === 'code') {
    /* 
      React Fragment (<>) allows us to show many different elements inside
      of it but it will not create any DOM elements that will show up
      inside of the browser.
    */
    child = <> 
      <div className="action-bar-wrapper">
        <ActionBar id={cell.id} />
      </div>
      <CodeCell cell={cell} />
    </>
  } else {
    child = <>
      <ActionBar id={cell.id} />
      <TextEditor cell={cell} />
    </>
  }

  return (
    <div className="cell-list-item">
      {child}
    </div>
  );
};

export default CellListItem;