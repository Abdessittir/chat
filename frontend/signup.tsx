import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';

import Form from './components/Form';
import Input from './components/Input';

const SignUp = () => {
  const [state, setState] = React.useState({
    name: '',
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
    if(!state.name || !state.email || !state.password) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <Form handleSubmit={handleSubmit} url="/auth/signup">
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
      <a href="/signin">SignIn</a>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SignUp />
    </React.StrictMode>,
);