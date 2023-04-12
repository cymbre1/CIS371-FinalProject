import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'

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

export const Login = (() => {
    const navigate = useNavigate();

    const createNewAccount = (() => {
        navigate("/createAccount");
    })

    return(
        <LoginForm>
          <div>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
          </div>
          <div>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
          </div>
          <div>
            <LoginButton type="submit">Submit</LoginButton>
            <LoginButton onClick={createNewAccount}>Create Account</LoginButton>
          </div>
        </LoginForm>
      )});