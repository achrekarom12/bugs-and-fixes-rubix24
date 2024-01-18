import './App.css'
import { Disasters, ContactUs, Volunteer, Search } from './Components/Pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Elements/Navbar';


function App() {


  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Disasters />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/search" element={<Volunteer />} />
        <Route exact path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  )
}

export default App
