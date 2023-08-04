import { useState, useSyncExternalStore } from "react";

const Controls = ({handleGridChange}) => {

  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  const handleRowsChange = (event) => {
    var r = event.target.value;
    if(r>100){
      r=100;
      alert("Max allowed value is 100")
    }
    setRows(r);
  }
  const handleColsChange = (event) => {
    var c = event.target.value;  
    if(c>100){
      c=100;
      alert("Max allowed value is 100")
    }
    setCols(c);
  }

  return (
    <div className="">
      <div className="flex flex-row flex-wrap gap-3 mb-4">
        <div>
          <label htmlFor="rows" className="block mb-2 text-sm font-bold text-gray-900">Rows</label>
          <input onChange={handleRowsChange} type="number" max={100} id="rows" defaultValue={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div>
          <label htmlFor="cols" className="block mb-2 text-sm font-bold text-gray-900">Colums</label>
          <input onChange={handleColsChange} type="number" max={100} id="cols" defaultValue={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
      </div>

      <button onClick={() => handleGridChange(rows,cols)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
  )
}

export default Controls;