import React from 'react';
import ReactDOM from 'react-dom/client';

// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import Todo from './components/Todo';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);
