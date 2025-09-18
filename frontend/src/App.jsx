import Header from "./components/header";
import Footer from "./components/footer";
import AppRouter from "./routes";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
