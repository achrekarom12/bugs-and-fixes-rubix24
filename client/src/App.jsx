import './App.css'
import { Desasters, ContactUs, Volunteer } from './Components/Pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Desasters />} />
        <Route exact path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  )
}

export default App
