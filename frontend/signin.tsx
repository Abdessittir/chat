import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';

import Form from './components/Form';
import Input from './components/Input';

const SignIn = () => {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = (event: React.FormEvent) => {
    if(!state.email || !state.password) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h1>SignIn</h1>
      <Form handleSubmit={handleSubmit} url="/auth/signin">
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
            value: 'SignIn',
            onChange: () => {}
           }}
        />
      </Form>
      <a href="/signup">SignUp</a>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SignIn />
    </React.StrictMode>,
);
