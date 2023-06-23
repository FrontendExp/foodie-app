import { useState } from 'react'
import User from './User'
import toast, { Toaster } from 'react-hot-toast';

const Login = () =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const handleLogin = (e) =>{
        e.preventDefault()
        if(username !== '' & password !== ''){
            if (User.name === username & password === User.password){
                localStorage.setItem("profile", JSON.stringify({name: User.name, id:User.id}))
                toast.success("Login success")
            }else{
               toast.error("Usernname or password is invalid")
            }
        }else{
            toast.error("All fields required")
        }
    }
    return(
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Toaster />
            <div className="pt-5 mt-5">
            <h3 className="text-center p-3">Login</h3>
                <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="form-control m-2" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="form-control m-2" />
            </div>
            <button onClick={(e) => handleLogin(e)} className="btn btn-primary">Login</button>
        </div>

        </>

    )
}

export default Login;