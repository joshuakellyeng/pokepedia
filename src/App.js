import { useContext } from 'react';
import { Routes, Route  } from 'react-router-dom';

//components
import Nav from './components/Nav';
//context
import UserContext from './contexts/UserContext';
//pages
import Login from './pages/Login';

//css
import './App.css';


function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'Christina'}>
        <Nav />
        {/* We need to wrap all of our routes insde react router routes component */}
        <Routes>
          <Route path='login' element={<Login/>} />
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
