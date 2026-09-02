import './App.css'
import Login from './page/Login.jsx'
import Home from './page/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Podcast from './page/Podcast.jsx'
import Message from './page/Message.jsx'
import Customer from './page/Customer.jsx'
import Slider from './page/Slider.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/podcast" element={<Podcast/>} />
      <Route path="/message" element={<Message />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/slider" element={<Slider/>} />
    </Routes>
  )
}

export default App
