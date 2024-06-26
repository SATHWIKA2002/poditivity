import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import ViewBlog from "./pages/viewBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/not-found" Component={NotFound} />
        <Route exact path="/blog/add/" Component={AddBlog} />
        <Route exact path="/blog/edit/:id" Component={EditBlog} />
        <Route exact path="/blog/:id" Component={ViewBlog} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
