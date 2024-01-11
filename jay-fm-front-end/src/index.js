import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './container/App';
import './tailwind.css'
import {DevSupport} from "@react-buddy/ide-toolbox";

const root = ReactDOM.createRoot(document.getElementById('root'));
// 渲染
//开发结束之后删除
root.render(
	<App/>
);
