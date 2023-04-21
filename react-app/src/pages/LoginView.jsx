import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const apiUrl = 'http://localhost:3002'

const LoginForm = styled.form `
    background: var(--color-OldLavendar);
    color: var(--color-WetPaper);
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border-radius: 5px;
    border: solid 1px white;
`;

const LoginButton = styled.button `
    background: var(--color-PrussianBlue);
    color: var(--color-WetPaper);
    padding: 5px;
    margin: 3px;
    border: solid 1px white;
    box-shadow: none;
    border-radius: 0px;
`;

export const Login = ((props) => {
    const navigate = useNavigate();

    const [login, setLogin] = React.useState({username: "", password: ""});

    function onLogin(event) {
      event.preventDefault();
      console.log("Sending in some stuff");
      fetch(`${apiUrl}/login/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          username: login.username,
          password: login.password
        }), // body data type must match "Content-Type" header
      })
        .then( response => response.json() )
        .then( data => {
          if(data !== "Invalid") {
            console.log("loginView data: ", data);
            props.setUser(data);
            navigate("/taskView");
          }
        })
        .catch( err => console.error(err) );
    }
  

    const createNewAccount = (() => {
        navigate("/createAccount");
    })

    return(
        <LoginForm>
          <div>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setLogin({...login, username: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
                <p>Password</p>
                <input type="password"  onChange={e => setLogin({...login, password: e.target.value})}/>
            </label>
          </div>
          <div>
            <LoginButton type="submit" onClick={e => onLogin(e)}>Submit </LoginButton> 
            <LoginButton onClick={createNewAccount}>Create Account</LoginButton>
          </div>
        </LoginForm>
      )});