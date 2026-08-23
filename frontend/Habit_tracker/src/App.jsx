import { BrowserRouter,Routes,Route } from 'react-router-dom';


import './App.css'
import { Navbar } from './components/NavBar';


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
    
    
      <Routes>

        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>register</h1>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
