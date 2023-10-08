import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar'

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
