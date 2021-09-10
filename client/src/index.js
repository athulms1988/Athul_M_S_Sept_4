import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./redux/store/index";
import Routes from "./routes/Routes";
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from "react-redux-toastr";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axios.interceptors.request.use(request => {
  let user = localStorage.getItem('user');
  let token;
  try {
    token = JSON.parse(user).token;
    request.headers['Authorization'] =  'Bearer '+ token;
  } catch (e) {
  }
  request.headers['Content-Type'] =  'application/json';
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
 }, (e) => {
  if(e.response && e.response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  return Promise.reject(e);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="App">
          <Routes />
          <ReduxToastr
              timeOut={5000}
              newestOnTop={true}
              position="top-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar={false}
              closeOnToastrClick
            />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
