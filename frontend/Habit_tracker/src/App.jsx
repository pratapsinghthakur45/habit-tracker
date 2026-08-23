import { BrowserRouter,Routes,Route } from 'react-router-dom';


import './App.css'
import { Navbar } from './components/NavBar';
import Register from './pages/register';
import Login from './pages/login';


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
    
    
      <Routes>
         <Route path="/register" element={<h1><Register/></h1>} />
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1><Login/></h1>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
