import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Register from './utilities/Register';

function App() {

  return (
    <>
      <div id="nav">
        <NavBar />
      </div>
      <div id="page">
        <Outlet />
      </div>

      <Register />
      
    </>
  );
}

export default App
