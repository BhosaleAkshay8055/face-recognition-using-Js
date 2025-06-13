import logo from './logo.svg';
import './App.css';
import FaceRegister from './components/FaceRegister';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceRecognizer from './components/FaceRecognizer';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FaceRegister />} />
          <Route exact path="/recognise" element={<FaceRecognizer />} />
          {/* Catch-all route for 404 page */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
