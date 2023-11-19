import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import './app.css';

import Form from './components/Form';
import Input from './components/Input';
import request, { Response } from './service/request';
import Alert from './components/Alert';

const SignUp = () => {
  const [state, setState] = React.useState({
    name: '',
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
    if(!state.name || !state.email || !state.password) {
    }

    const response: Response = await request(
      '/auth/signup',
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
      <h1 className="form_link">SignUp</h1>
      <Form handleSubmit={handleSubmit} className="form">
        <Input
           label="name"
           options={{
            type: 'text',
            name: 'name',
            placeholder: 'Your name',
            value: state.name,
            onChange: handleChange
           }}
        />
        <Input
           label="email"
           options={{
            type: 'email',
            name: 'email',
            placeholder: 'Your email',
            value: state.email,
            onChange: handleChange
           }}
        />
        <Input
           label="password"
           options={{
            type: 'password',
            name: 'password',
            placeholder: 'Your password',
            value: state.password,
            onChange: handleChange
           }}
        />
        <Input
           label=""
           options={{
            type: 'submit',
            name: 'submit',
            placeholder: '',
            value: 'SignUp',
            onChange: () => {}
           }}
        />
      </Form>
      <a href="/signin" className="form_link">SignIn</a>
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

export default SignUp;
