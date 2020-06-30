import React, { useState, useEffect } from 'react';
import SignInSignUp from "./components/page/SignInSignUp/";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogedApi } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setCheckLogin(false);
    setLoadUser(true);
  }, [checkLogin]);

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}> 
      {!user ? (
        <div>
          <SignInSignUp setCheckLogin={setCheckLogin}/>
        </div>
      ) : (
        <Routing setCheckLogin={setCheckLogin} />
      )}

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />

    </AuthContext.Provider>
  )
}

