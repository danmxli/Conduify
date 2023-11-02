import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Portal from './pages/Portal';
import About from './pages/About';
import Home from './pages/Home'
import Chat from './pages/Chat';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/about' element={<About />} />
      <Route path='/portal' element={<Portal />} />
      <Route path='/home' element={<Home />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>

  )
}

export default App
