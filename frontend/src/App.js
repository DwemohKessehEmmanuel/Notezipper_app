import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './Pages/MyNotes/MyNotes';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import CreateNote from './Pages/createNote/CreateNote';
import SingleNote from './Pages/SingleNote/SingleNote';
import { useState } from 'react';
import ProfilePage from './Pages/ProfilePage/ProfilePage';

function App() {
  
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote/>} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
