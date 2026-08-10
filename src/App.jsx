import './App.css'
import Login from './page/Login.jsx'
import Home from './page/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Podcast from './page/Podcast.jsx'
import Message from './page/Message.jsx'
import Customer from './page/Customer.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/podcast" element={<Podcast/>} />
      <Route path="/message" element={<Message />} />
      <Route path="/customer" element={<Customer />} />
    </Routes>
  )
}

export default App
