import React, {useState} from 'react';
import { login } from '../actions/index';
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";

//Oauth//
import ReactDOM from 'react-dom';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

const Login = props =>{

        const [loginInfo, setLogininfo] = useState({ email: "", password: "" });

        const handleSubmit = event => {
          event.preventDefault();
          props.login(loginInfo)
          // .then(() => props.history.push('/'))
          props.history.push('/')
          setLogininfo({ email: "", password: "" });
        };

        const handleChange = event => {
          setLogininfo({ ...loginInfo, [event.target.name]: event.target.value });
        };

        //Oauth
        const responseGoogle = (response) => {
          
          const { tokenId } = response;
          localStorage.setItem("token", tokenId);
          props.signUpGoogle();
          props.history.push('/')

        }

        const logoutGoogle = () => {

          localStorage.removeItem("token");
          props.history.push('/')

        }
        //Oauth 

    return(
        <div>
          <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br/>
          <input
            required
            type="text"
            name="email"
            placeholder="email"
            value={loginInfo.email}
            onChange={handleChange}
            />
          <br/>
          <label>Password</label>
          <br/>
          <input
            required
            type="password"
            name="password"
            placeholder="password"
            value={loginInfo.password}
            onChange={handleChange}
            />
          <br/>
          <button type='submit'>Log In</button>
        </form>

        {/* Oauth */}
         <div style={{ display: localStorage.token ? "none" : "block" }}>
        <GoogleLogin
          clientId="1058848707297-n2rl4b301ivq0gipo2pbenr80sa5mtp2.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        </div>
        <div style={{ display: localStorage.token ? "block" : "none" }}>
        <GoogleLogout
          clientId="1058848707297-n2rl4b301ivq0gipo2pbenr80sa5mtp2.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logoutGoogle}
        >
        </GoogleLogout>
        </div>
        {/* Oauth */}
        </div> 
    )

}

const mapStateToProps = state => {
  return {
      userData: state.userData
  };
};

export default connect(mapStateToProps, { login })(Login)