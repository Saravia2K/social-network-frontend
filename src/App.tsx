import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./pages/Index";
import Navbar from "./layouts/Navbar";
import RegistroPage from "./pages/Registro";
import LoginPage from "./pages/Login";
import { ToastContainer } from "react-toastify";
import ReverseProtectedRoute from "./components/ReverseProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ReverseProtectedRoute />}>
          <Route path="registro" element={<RegistroPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<Navbar />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
      <ToastContainer hideProgressBar />
    </BrowserRouter>
  );
}

export default App;
