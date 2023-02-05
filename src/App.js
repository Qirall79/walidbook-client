import { useState, useEffect } from "react";

import Loader from "./components/Loader";
import fetchUser from "./utils/fetchUser";
import BrowserSwitch from "./RouteSwitch";

function App() {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchUser(setUser, setLoaded);
  }, []);

  if (!loaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return <BrowserSwitch user={user} setUser={setUser} />;
}

export default App;
