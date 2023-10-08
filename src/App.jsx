import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar'
import "./assets/index.css";

function App() {

  return (
    <>
      <div id="nav">
        <NavBar />
      </div>
      <div id="page">
        <Outlet />
      </div>
    </>
  );
}

export default App
