import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="posts" element={<Homepage />} />
        <Route path="register" element={user ? <Homepage /> : <Register />} />
        <Route path="login" element={user ? <Homepage /> : <Login />} />
        <Route path="post/:id" element={<Single />} />
        <Route path="write" element={user ? <Write /> : <Login />} />
        <Route path="settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
