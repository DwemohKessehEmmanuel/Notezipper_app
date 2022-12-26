import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './Pages/MyNotes/MyNotes';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      
      <main>
        <Routes>
           <Route path='/' element={<LandingPage/>} exact/>
          <Route path='/mynotes' element={<MyNotes/>} />
        </Routes>
       
      </main>
      
      <Footer />
    </BrowserRouter>
  )
}

export default App;
