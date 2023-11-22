import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { PacManLoader, Pulse, Loader } from "./loading/LoadingComponent";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{loading ? <PacManLoader loading={true} /> : <Login />}</>;
}

export default App;
