import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      {/* <Header/>
      <h1 className="text-amber-200 text-center text-4xl">Vite + React</h1>
      <Footer/> */}
    </div>
  );
}

export default App;
