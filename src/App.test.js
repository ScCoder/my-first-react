import React from 'react';
import ReactDOM from 'react-dom';
import AppSamuraiJS from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppSamuraiJS />, div);
  ReactDOM.unmountComponentAtNode(div);
});
