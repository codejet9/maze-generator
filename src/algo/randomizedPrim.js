import maxHeap from "../ds/maxheap"

const create2DArray = (N, M) => {
  const array2D = new Array(N);
  for (let i = 0; i < N; i++) {
    array2D[i] = new Array(M).fill(false);
  }
  return array2D;
}


const add_frontier = (x,y,n,m,frontiers,vis) => {
  if(x>=0 && y>=0 && x<n && y<m && !vis[x][y]){
    frontiers.push([Math.random(), [x,y]]);   //[priority, [coordinates]]
  }
}

const mark = (x,y,n,m,vis,frontiers,matrix) => {
  // console.log(x,y);
  vis[x][y]=true;
  matrix[x][y][0]='white'

  add_frontier(x-1,y,n,m,frontiers,vis);
  add_frontier(x,y-1,n,m,frontiers,vis);
  add_frontier(x+1,y,n,m,frontiers,vis);
  add_frontier(x,y+1,n,m,frontiers,vis);
}

const neighbours = (x,y,n,m,vis) => {
  const v = []

  if(x-1>=0 && y>=0 && x-1<n && y<m && vis[x-1][y]) v.push([[x-1,y],'top'])
  if(x>=0 && y-1>=0 && x<n && y-1<m && vis[x][y-1]) v.push([[x,y-1],'left'])
  if(x+1>=0 && y>=0 && x+1<n && y<m && vis[x+1][y]) v.push([[x+1,y],'bottom'])
  if(x>=0 && y+1>=0 && x<n && y+1<m && vis[x][y+1]) v.push([[x,y+1],'right'])

  return v;
}


const passage = (cur, inCell, position, matrix) => {
  console.log(cur,inCell)
  if(position==='top'){
    //cur remove top border, inCell remove bottom border
    matrix[cur[0]][cur[1]][3] = '0px';
    matrix[inCell[0]][inCell[1]][4] = '0px';
  }
  else if(position==='left'){
    //cur remove left border, inCell remove right border
    matrix[cur[0]][cur[1]][1] = '0px';
    matrix[inCell[0]][inCell[1]][2] = '0px';
  }
  else if(position==='bottom'){
    //cur remove bottom border, inCell remove top border
    matrix[cur[0]][cur[1]][4] = '0px';
    matrix[inCell[0]][inCell[1]][3] = '0px';
  }
  else if(position==='right'){
    //cur remove right border, inCell remove left border
    matrix[cur[0]][cur[1]][2] = '0px';
    matrix[inCell[0]][inCell[1]][1] = '0px';
  }
}

const randomizedPrim = (n,m, matrix) => {
  const frontiers = new maxHeap();
  const vis = create2DArray(n,m);

  mark(Math.floor(Math.random() * n), Math.floor(Math.random() * m), n,m, vis, frontiers, matrix);

  while(!frontiers.empty()){
    // frontiers.show();
    const frontier = frontiers.pop();

    if(vis[frontier[1][0]][frontier[1][1]]) continue;

    const v = neighbours(frontier[1][0], frontier[1][1], n,m, vis);

    const randomInCell = v[Math.floor(Math.random() * v.length)];

    passage(frontier[1], randomInCell[0], randomInCell[1], matrix)

    mark(frontier[1][0],frontier[1][1], n,m, vis, frontiers, matrix)
  }
  
  //open starting and last cells
  matrix[0][0][1] = '0px';
  matrix[n-1][m-1][2] = '0px'
  return matrix;

}

export default randomizedPrim;