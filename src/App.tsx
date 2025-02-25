import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./pages/Index";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
