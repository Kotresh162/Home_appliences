import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './components/home/home_page.jsx'
import Dashbord from './components/dashbord/dashbord_page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Homepage/> */}
    {/* <Dashbord /> */}
  </StrictMode>,
)
