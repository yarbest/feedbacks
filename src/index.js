import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));

//убрал строгий режим, так как material ui выдает ошибку findDOMNode is deprecated in StrictMode
