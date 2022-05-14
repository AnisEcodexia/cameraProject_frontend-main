
import './App.css';

import Upload from './pages/Upload';

import Home from './pages/Home';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ImgDropAndCrop from './components/ImgDropAndCrop';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path = "/upload" element={<Upload/>}/>
        <Route exact path = "/zone" element={<ImgDropAndCrop/>}/>
      </Routes>
    </Router>

  );
}

export default App;