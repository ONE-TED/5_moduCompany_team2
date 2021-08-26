import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

import { TaskProvider } from 'Store/taskProvider';
import { TodoProvider } from 'Store/todoProvider';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
