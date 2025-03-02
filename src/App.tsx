import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./pages/Index";
import Navbar from "./layouts/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
