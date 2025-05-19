import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import MyConnections from "./components/MyConnections";
import RequestReceived from "./components/RequestReceived";

function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<MyConnections/>}/>
          <Route path="/request" element={<RequestReceived/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
