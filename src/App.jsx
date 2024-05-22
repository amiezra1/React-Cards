import { useState } from "react";
// import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import searchContext from "./store/searchContext";
import { ToastContainer } from "react-toastify";
import { LayoutComponent } from "./layout/LayoutComponent";

function App() {
  const [login, setLogin] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <searchContext.Provider value={{ search, setSearch }}>
        <ToastContainer />
        <LayoutComponent>
          <Router />
        </LayoutComponent>
      </searchContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
