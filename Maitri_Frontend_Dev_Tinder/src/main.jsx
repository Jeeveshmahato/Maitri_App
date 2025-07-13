import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";

import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './Utiles/appStore.js'

const root  = ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={appStore}>
   <StrictMode>
    <App />
  </StrictMode>,
 </Provider>
)
