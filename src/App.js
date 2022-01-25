import {useState, useContext } from 'react';
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

  const [user, setUser] = useState('')


  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Nav />
        {/* We need to wrap all of our routes insde react router routes component */}
        <Routes>
          <Route path='login' element={<Login setUser={setUser} />} />
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
