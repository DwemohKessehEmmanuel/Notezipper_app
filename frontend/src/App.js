import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './Pages/MyNotes/MyNotes';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      
      <main>
        <Routes>
           <Route path='/' element={<LandingPage/>} exact/>
          <Route path='/mynotes' element={<MyNotes/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
        </Routes>
       
      </main>
      
      <Footer />
    </BrowserRouter>
  )
}

export default App;
