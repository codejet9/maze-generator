import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Controls from './components/controls';
import Maze from './components/Maze';
import html2canvas from 'html2canvas';

const App = () => {

  const [changeGrid, setChangeGrid] = useState(false);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);

  const handleGridChange = (n,m) => {
    setRows(n); setCols(m);
    if(!changeGrid) setChangeGrid(!changeGrid);
  }

  const handleMazeDownload = async () => {
    const element = document.getElementById('maze'),
    canvas = await html2canvas(element),
    data = canvas.toDataURL('image/jpg'),
    link = document.createElement('a');

    link.href = data;
    link.download = 'maze.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Header />

      <main className='flex flex-row flex-wrap gap-3 p-6 justify-between'>
        <div className='flex flex-col gap-4'>
          <div id='maze' className='p-1'> <Maze rows={rows} cols={cols} changeGrid={changeGrid} /> </div>
          <button onClick={handleMazeDownload} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Download as an image</button>
        </div>
        <Controls handleGridChange={handleGridChange} />
      </main>
    </>
  );
}

export default App;
