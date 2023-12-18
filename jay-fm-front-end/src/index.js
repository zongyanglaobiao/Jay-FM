import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './container/App';
import './tailwind.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
// 渲染
root.render(
    <App/>
);
