import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens';
import StudentDashboard from './screens/Student/StudentDashboard';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MyProfileDashboard from './screens/shared/components/MyProfileDashboard';

ReactDOM.render(<MyProfileDashboard />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
