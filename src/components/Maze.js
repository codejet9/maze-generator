import { useState, useEffect } from "react";
import randomizedPrim from "../algo/randomizedPrim";
import bfs from "../algo/bfs";
import dfsSol from "../algo/dfs";

const createInitialMatrix = (rows, cols) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for(let j=0;j<cols;j++){
      const borderLeft = (j===0) ? '2px' : '1px';
      const borderRight = (j===cols-1) ? '2px' : '1px';
      const borderTop = (i===0) ? '2px' : '1px';
      const borderBottom = (i===rows-1) ? '2px' : '1px';
      
      row.push(['gray',borderLeft,borderRight,borderTop,borderBottom])
    }
    matrix.push(row)
  }
  return matrix;
};




const Maze = ({rows,cols, changeGrid, showSol}) => {
  rows=parseInt(rows); cols=parseInt(cols);

  const [matrix, setMatrix] = useState(createInitialMatrix(rows,cols));

  useEffect(() => {
    if(showSol){
      var updatedMatrix = bfs(rows,cols,matrix);
      setMatrix(updatedMatrix)
      return;
    }

    if(changeGrid){
      var newMatrix = createInitialMatrix(rows,cols);
      var updatedMatrix = randomizedPrim(rows,cols,newMatrix);
      setMatrix(updatedMatrix)
    }
  },[rows,cols,changeGrid,showSol])



  const gridStyle = {
    'display': 'grid',
    'gridTemplateColumns': `repeat(${cols}, minmax(0, 1fr))`,
    'width':'auto'
  };

  return(
    <div style={gridStyle}>
      {matrix.map((row, rowIdx) => (
        row.map((col, colIdx) => (
          <Cell 
            key={`${rowIdx}-${colIdx}`}
            cols={cols}
            color={col[0]}
            borderLeft={col[1]}
            borderRight={col[2]}
            borderTop={col[3]}
            borderBottom={col[4]}
          />
        ))
      ))}
    </div>
  )
}

const Cell = ({cols, color, borderLeft, borderRight, borderTop, borderBottom}) => {
  const padding = Math.min(2, (50/cols)*0.4)
  const cellStyle = { 
    'backgroundColor': color,
    'borderColor': 'black',
    'borderStyle': 'solid',
    'borderLeftWidth': borderLeft,
    'borderRightWidth': borderRight,
    'borderTopWidth': borderTop,
    'borderBottomWidth': borderBottom,
    'textAlign': 'center',
    'padding': `${padding}vw`
  };

  return(
    <div style={cellStyle}>
    </div>
  )
}

export default Maze;