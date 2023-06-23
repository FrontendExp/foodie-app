import { useState } from 'react';
import './App.css';
import Header from './Header'
import Dash from './Dashboard'
import Login from './Login';

function App() {
  const [user, setUser] = useState(false)

  setInterval(() =>{
     if(localStorage.getItem('profile')){
      setUser(true)
     }else{
      setUser(false)
     }
  },300)
  return (
    <div>
      <Header />
      {user ? 
      <Dash /> :
      <Login />
}
    </div>
  );
}

export default App;