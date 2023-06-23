import {useState} from 'react'
import Category from './Components/Category';
import Product from './Components/Products';
import Pos from './Components/Pos';
import Report from './Components/Report';
import User from './User';
import { toast } from 'react-hot-toast';


const Dash = () => {

  const [viewnumber, setViewnumber] = useState('')

 
  const handleLogout=()=>{

    localStorage.clear(User)
    toast.success('Logout Successful')


  }
  


    return (
      <div className=" d-flex flex-row">
      {/* left side section */}
      <div className='d-flex flex-column bg-danger' style={{width:'175px', height:'80vh'}}>
      <ul className='dlist'>
        <li onClick={() =>setViewnumber(1)}>POS</li>
        <hr/>
        <li onClick={() =>setViewnumber(2)}>Products</li>
        <hr/>
        <li onClick={() =>setViewnumber(3)}>Categories</li>
        <hr/>
        <li onClick={() =>setViewnumber(4)}>Report</li>
        <hr/>
        <button onClick={((e) => handleLogout(e.target.value) )}
         className='btn btn-primary m-3'>Logout</button>
      </ul>
     </div>
      {/* right side section of Dashboard */}
     <div className="m-2" style={{width:'88vw', height:'85vh'}}>
     {viewnumber === 3 && <Category />}
     {viewnumber === 2 && <Product />}
     {viewnumber === 1 && <Pos />}
     {viewnumber === 4 && <Report />}


     </div>
    </div>
    )

}

export default Dash;