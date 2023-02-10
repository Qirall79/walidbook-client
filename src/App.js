import { useState, useEffect } from "react";

import Loader from "./components/Loader";
import fetchUser from "./utils/fetchUser";
import BrowserSwitch from "./RouteSwitch";

function App() {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  const getUser = async () => {
    await fetchUser(setUser, setLoaded);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!loaded) {
    return (
      <div className="w-screen h-screen bg-[#0077FF] flex items-center justify-center">
        <Loader isChild={false} />
      </div>
    );
  }
  return <BrowserSwitch user={user} setUser={setUser} />;
}

export default App;
