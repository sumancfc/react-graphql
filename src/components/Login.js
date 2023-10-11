import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    login: true,
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate("/");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate("/");
    },
  });

  return (
    <div className='w-full max-w-xs mx-auto my-10'>
      <h1 className='mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
        {formState.login ? "Login" : "Sign Up"}
      </h1>

      <div className='block '>
        {!formState.login && (
          <div className='mb-6'>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              type='text'
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              placeholder='Your Name'
            />
          </div>
        )}
        <div className='mb-6'>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='email'
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            placeholder='Your email address'
          />
        </div>
        <div className='mb-6'>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            type='password'
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            placeholder='Choose a safe password'
          />
        </div>
      </div>
      <div className='block'>
        <button
          className='focus:outline-none text-white text-md font-extraboldbg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
          type='button'
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "Login" : "Create Account"}
        </button>

        <button
          className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "Need to create an account?"
            : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
