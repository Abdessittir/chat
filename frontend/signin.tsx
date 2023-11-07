import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import './app.css';

import Form from './components/Form';
import Input from './components/Input';
import request, { Response } from './service/request';
import Alert from './components/Alert';

const SignIn = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    error: '',    
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!state.email || !state.password) {
      
    }

    const response: Response = await request(
      '/auth/signin',
      {
        method: 'post',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if(response.success) {
      navigate('/');
    } else {
      setState(prev => ({
        ...prev,
        error: response.error
      }))
    }
  };

  return (
    <div>
      <h1>SignIn</h1>
      <Form handleSubmit={handleSubmit}>
        <Input
           label="email"
           options={{
            type: 'email',
            name: 'email',
            placeholder: 'Your email',
            value: state.email,
            onChange: handleChange,
            required: true,
           }}
        />
        <Input
           label="password"
           options={{
            type: 'password',
            name: 'password',
            placeholder: 'Your password',
            value: state.password,
            onChange: handleChange,
            required: true,
           }}
        />
        <Input
           label=""
           options={{
            type: 'submit',
            name: 'submit',
            placeholder: '',
            value: 'SignIn',
            onChange: () => {},
           }}
        />
      </Form>
      <a href="/signup">SignUp</a>
      {state.error && (
        <Alert
          message={state.error}
          type='error'
          clear={() => setState(prev => ({ ...prev, error: '' }))}
        />
      )}
    </div>
  );
};

export default SignIn;
