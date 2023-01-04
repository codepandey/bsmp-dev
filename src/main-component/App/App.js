import React from "react";
import AllRoute from "../router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../sass/style.scss";
import {
  getLocalConvId,
  setLocalConvId,
} from "../../apiService/localStorageItem";
import { AnimatePresence } from "framer-motion";

const App = () => {
  // React.useEffect(() => {
  //   let convId = getLocalConvId();
  //   if (!convId) {
  //     setLocalConvId();
  //   }
  // }, []);

  return (
    <div className="App" id="scrool">
      <AnimatePresence>
        <AllRoute />
      </AnimatePresence>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
