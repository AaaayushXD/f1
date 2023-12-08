import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { PacManLoader } from "./loading/LoadingComponent";
import { Provider } from "react-redux";
import { store, persistor } from "./state/store";
import Register from "./auth/Register";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/Auth";
import Home from "./Components/Home.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import News from "./Components/News.jsx";
import DriverStandings, { PodiumWinners } from "./Components/Drivers.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Teams from "./Components/Teams.jsx";
import { Schedules } from "./Components/Schedules.jsx";
import { ResultPage } from "./Components/Results.jsx";
import Circuits from "./Components/Circuits.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/drivers" element={<DriverStandings />} />
                  <Route path="/test" element={<PodiumWinners />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/circuits" element={<Circuits />} />
                  <Route path="/schedules" element={<Schedules />} />
                  <Route path="/results/:id" element={<ResultPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
