import React, { useState } from "react";


function Login(){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    function handleSubmit(e) {
       e.preventDefault();
       console.log({email,password})
    }
    return(
        <div className="loginform_container">
            <form className="login_form" action="" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>

                <div className="group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>

                <button type="submit">Login</button>

                <p className="forgot-password"
                onClick={() =>alert("Password reset link sent to your registered email")} >Forgot Password?</p>
                {/* <p>or</p> */}
                {/* <button type="submit">Continue with Google</button>
                <button type="submit">Continue with LinkedIn</button> */}
            </form>           
        </div>

    );
}
export default Login