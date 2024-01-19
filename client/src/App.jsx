import './App.css'
import { Disasters, ContactUs, Volunteer, Home, TweetsAnalysis, ChatBot , Search} from './Components/Pages'
import Navbar from './Components/Elements/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {  
  const visiblitieupdate = (value) => {
    // Your function implementation here
  }
  return (

    <Router>
      <Navbar visiblitieupdate={visiblitieupdate} />
      <Routes>
        <Route exact path="/" element={<Disasters />} />
        <Route exact path="/" element={<Disasters />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/image" element={<Image />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/volunteer" element={<Volunteer />} />
        <Route exact path="/tweetsAnalysis" element={<TweetsAnalysis />} />
        <Route exact path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
