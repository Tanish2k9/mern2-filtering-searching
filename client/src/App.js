
import {  Routes,Route } from 'react-router-dom';
import './App.css';
import Tables from './component/tables/Tables';
import TableTwo from './component/tabletwo/TableTwo';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Tables/>}/>
        <Route path="/lastTask" element={<TableTwo/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
