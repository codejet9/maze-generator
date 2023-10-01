import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useState, useSyncExternalStore } from "react";

const Controls = ({ handleGridChange, handleDisplaySol }) => {

  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [algoType, setAlgoType] = useState('prims');

  const handleRowsChange = (event) => {
    var r = event.target.value;
    if (r > 100) {
      r = 100;
      alert("Max allowed value is 100")
    }
    setRows(r);
  }
  const handleColsChange = (event) => {
    var c = event.target.value;
    if (c > 100) {
      c = 100;
      alert("Max allowed value is 100")
    }
    setCols(c);
  }
  const handleAlgoType = (event) => {
    setAlgoType(event.target.value)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-2xl font-bold whitespace-nowrap">Maze Controls</p>
        <hr className="border-t-2 mb-3 mt-1" />
        <div className="flex flex-row flex-wrap gap-3 mb-4">
          <div>
            <label htmlFor="rows" className="block mb-2 text-sm font-bold text-gray-900">Rows</label>
            <input onChange={handleRowsChange} type="number" max={100} id="rows" defaultValue={20} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <div>
            <label htmlFor="cols" className="block mb-2 text-sm font-bold text-gray-900">Colums</label>
            <input onChange={handleColsChange} type="number" max={100} id="cols" defaultValue={20} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="maze-algo" className="block mb-1 font-medium text-gray-900">Choose an Algorithm</label>
          <select id="maze-algo" onChange={handleAlgoType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="prims">Prims' Algorithm</option>
            <option value="kruskal">Kruskal Algorithm</option>
          </select>
        </div>

        <button onClick={() => handleGridChange(rows, cols, algoType)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate</button>
      </div>

      <div>
        <p className="text-2xl font-bold whitespace-nowrap">Maze Solution</p>
        <hr className="border-t-2 mb-3 mt-1" />

        <button onClick={handleDisplaySol} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Solve the Maze</button>
      </div>

    </div>
  )
}

export default Controls;