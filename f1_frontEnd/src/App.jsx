import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { PacManLoader } from "./loading/LoadingComponent";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Register from "./auth/Register";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/Auth";
import Home from "./Components/Home.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import News from "./Components/News.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading && <PacManLoader />}
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              {/* <Route element={<PrivateRoute />}> */}
              {/* </Route> */}
            </Routes>
          </AuthProvider>
        </Router>
      </Provider>
    </>
  );
}

export default App;
