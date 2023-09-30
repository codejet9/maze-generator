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





const bfs = (n, m, oldmatrix) => {

  const matrix=oldmatrix.map(row => [...row]);

  const queue=[];
  const level=createMatrix(n,m,1e6);
  const parent=createMatrix(n,m,[-1,-1]);
  const vis=createMatrix(n,m,0);

  queue.push([0,0]);
  vis[0][0]=1;
  level[0][0]=0;

  while(queue.length!==0){
    const [i,j]=queue.shift();

    //children
    if(matrix[i][j][1]==='0px' && j-1>=0 && vis[i][j-1]===0){
      queue.push([i,j-1]);
      vis[i][j-1]=1;
      if(level[i][j]+1<level[i][j-1]){
        level[i][j-1]=level[i][j]+1;
        parent[i][j-1]=[i,j];
      }
    }
    if(matrix[i][j][2]==='0px' && j+1<m && vis[i][j+1]===0){
      queue.push([i,j+1]);
      vis[i][j+1]=1;
      if(level[i][j]+1<level[i][j+1]){
        level[i][j+1]=level[i][j]+1;
        parent[i][j+1]=[i,j];
      }
    }
    if(matrix[i][j][3]==='0px' && i-1>=0 && vis[i-1][j]===0){
      queue.push([i-1,j]);
      vis[i-1][j]=1;
      if(level[i][j]+1<level[i-1][j]){
        level[i-1][j]=level[i][j]+1;
        parent[i-1][j]=[i,j];
      }
    }
    if(matrix[i][j][4]==='0px' && i+1<n && vis[i+1][j]===0){
      queue.push([i+1,j]);
      vis[i+1][j]=1;
      if(level[i][j]+1<level[i+1][j]){
        level[i+1][j]=level[i][j]+1;
        parent[i+1][j]=[i,j];
      }
    }
  }

  var [i,j]=parent[n-1][m-1];
  matrix[n-1][m-1][0]='#2ca3ff';

  while(i!==-1 && j!==-1){
    matrix[i][j][0]='#2ca3ff';
    [i,j]=parent[i][j];
  }

  return matrix;
}

export default bfs;