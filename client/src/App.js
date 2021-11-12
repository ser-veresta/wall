import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import ResetPassword from "./pages/ResetPassword";
import NaveBar from "./components/NaveBar";
import Modal from "./components/utils/Modal";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify-redux";
import Footer from "./components/Footer";

function App() {
  const { open } = useSelector((state) => state.modalReducer);
  return (
    <main className="font-rubik text-primary-text z-0 bg-primary-light">
      <Router>
        <NaveBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/activate/:activateToken" component={Activate} />
          <Route path="/resetPassword/:resetToken" component={ResetPassword} />
        </Switch>
        <Footer />
      </Router>
      <Modal open={open} />
      <ToastContainer position="top-center" autoClose={3000} />
    </main>
  );
}

export default App;
