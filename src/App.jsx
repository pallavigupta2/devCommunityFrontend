import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
