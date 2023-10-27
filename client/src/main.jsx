import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'  //*Al momento de abrir la etiqueta Provider, pasarle store={store}.
// import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
)
