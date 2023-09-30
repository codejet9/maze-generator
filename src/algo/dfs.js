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



const dfs = (n,m,matrix,vis,parent,i,j,par) => {
  vis[i][j]=1;
  parent[i][j]=par;

  if(matrix[i][j][1]==='0px' && j-1>=0 && vis[i][j-1]===0){
    dfs(n,m,matrix,vis,parent,i,j-1,[i,j]);
  }
  if(matrix[i][j][2]==='0px' && j+1<m && vis[i][j+1]===0){
    dfs(n,m,matrix,vis,parent,i,j+1,[i,j]);
  }
  if(matrix[i][j][3]==='0px' && i-1>=0 && vis[i-1][j]===0){
    dfs(n,m,matrix,vis,parent,i-1,j,[i,j]);
  }
  if(matrix[i][j][4]==='0px' && i+1<n && vis[i+1][j]===0){
    dfs(n,m,matrix,vis,parent,i+1,j,[i,j]);
  }
}



const dfsSol = (n, m, oldmatrix) => {

  const matrix = oldmatrix.map(row => [...row]);

  const parent = createMatrix(n, m, [-1, -1]);
  const vis = createMatrix(n, m, 0);

  dfs(n,m,matrix,vis,parent,0,0,[-1,-1]);

  var [i,j]=parent[n-1][m-1];
  matrix[n-1][m-1][0]='red';

  while(i!==-1 && j!==-1){
    matrix[i][j][0]='red';
    [i,j]=parent[i][j];
  }

  return matrix;
}

export default dfsSol;