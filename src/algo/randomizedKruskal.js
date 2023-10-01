function createMatrix(n, m, num) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(num);
    }
    matrix.push(row);
  }
  return matrix;
}

function areEqual(a1,a2){
  if(a1.length!==a2.length) return false;
  for(let i=0;i<a1.length;i++){
    if(a1[i]!==a2[i]) return false;
  }
  return true;
}


function make_set(parent,size,i,j){
  parent[i][j]=[i,j];
  size[i][j]=1;
}

function find_set(parent,i,j){
  if(areEqual([i,j],parent[i][j])){
    return [i,j];
  }
  var [i1,j1] = parent[i][j];
  return parent[i][j] = find_set(parent,i1,j1);
}

function union_sets(parent,size,x1,y1,x2,y2){
  var [p1x,p1y] = find_set(parent,x1,y1);
  var [p2x,p2y] = find_set(parent,x2,y2);

  if(p1x!==p2x || p1y!==p2y){
    if(size[p1x][p1y]<size[p2x][p2y]){
      var [t1,t2]=[p1x,p1y];
      [p1x,p1y]=[p2x,p2y];
      [p2x,p2y]=[t1,t2];
    }

    parent[p2x][p2y]=[p1x,p1y];
    size[p1x][p1y]+=size[p2x][p2y];
  }
}


const randomizedKruskal = (n, m, matrix) => {
  const edges=[];
  for(let i=0;i<n;i++){
    for(let j=0;j<m;j++){
      if(j+1<m) edges.push([[i,j],[i,j+1]]);
      if(i+1<n) edges.push([[i,j],[i+1,j]]);
    }
  }

  const parent=createMatrix(n,m,[-1,-1]);
  const size=createMatrix(n,m,0);

  for(let i=0;i<n;i++){
    for(let j=0;j<m;j++){
      make_set(parent,size,i,j);
    }
  }

  while(edges.length>0){
    const randomIdx = Math.floor(Math.random() * edges.length);
    const randomEdge = edges.splice(randomIdx,1)[0];

    const [[x1,y1],[x2,y2]] = randomEdge;

    if(areEqual(find_set(parent,x1,y1),find_set(parent,x2,y2))) continue;

    matrix[x1][y1][0]='white';
    matrix[x2][y2][0]='white';

    if(y2-y1===1){
      matrix[x1][y1][2]='0px';
      matrix[x2][y2][1]='0px';
    }
    else if(x2-x1===1){
      matrix[x1][y1][4]='0px';
      matrix[x2][y2][3]='0px';
    }

    union_sets(parent,size,x1,y1,x2,y2);
  }
  //open maze
  matrix[0][0][1]='0px';
  matrix[n-1][m-1][2]='0px';

  return matrix;
}

export default randomizedKruskal;