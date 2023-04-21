import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const apiUrl = 'http://localhost:3002'

const CreateAcctForm = styled.form `
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

const CreateAcctButton = styled.button `
    background: var(--color-PrussianBlue);
    color: var(--color-WetPaper);
    padding: 5px;
    margin: 3px;
    border: solid 1px white;
    box-shadow: none;
    border-radius: 0px;
`;

export const CreateAcct = ((props) => {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState({name: "", email: "", password: "", confirmPassword: "", pfpref: "pfp/defaultUser.png"});

  function onLogin(event) {
    event.preventDefault();
    console.log("Sending in some stuff");
    fetch(`${apiUrl}/createUser/`, {
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
        name: login.name,
        email: login.email,
        password: login.password,
        confirmPassword: login.confirmPassword,
        pfpref: login.pfpref
      }), // body data type must match "Content-Type" header
    })
      .then( response => response.json() )
      .then( data => {
        if(data !== "Invalid Information") {
          props.setUser(data.id);
          props.setUserData({...props.userData, users: [...props.userData.users, data]})
          navigate("/taskView");
        }
      } )
      .catch( err => console.error(err) );
  }

    return(
        <CreateAcctForm>
          <div>
            <label>
              <p>Full Name</p>
              <input type="text" onChange={e => setLogin({...login, name: e.target.value})}/>
            </label>
          </div>
          <div>
            <label>
                <p>email</p>
                <input type="text" onChange={e => setLogin({...login, email: e.target.value})}/>
            </label>
          </div>
          <div>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setLogin({...login, password: e.target.value})}/>
            </label>
          </div>
          <div>
            <label>
                <p>Confirm Password</p>
                <input type="password" onChange={e => setLogin({...login, confirmPassword: e.target.value})}/>
            </label>
          </div>
          <div>
            <CreateAcctButton type="submit" onClick={(e) => onLogin(e)}>Submit</CreateAcctButton>
          </div>
        </CreateAcctForm>
      )});