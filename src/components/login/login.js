import React, { useContext } from "react";
import { ImCross } from "react-icons/im";

// import services
import { handleLogin } from "../../services/auth";

//import context
import { LoginContext } from "../../contexts/loginContexts/store";

import "./login.css";

const Login = () => {
  const [state, dispatch] = useContext(LoginContext);

  const handleAuth = async (loginProvider) => {
    try {
      const { user, token } = await handleLogin(loginProvider);

      if (!user && !token) throw new Error("Something went wrong");

      //dispatch new state
      dispatch({ type: "UPDATE_LOGIN_FLAG", payload: !state.isLoggedIn });
      dispatch({ type: "TOGGLE_LOGIN_BOX", payload: !state.showLoginBox });
      dispatch({ type: "SET_USER", payload: { user, token } });

      //set user into localstorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-body">
      <div>
        <div className="row text-center">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin">
              <div className="card-body">
                <h2 className="card-title text-center font-weight-bold">
                  Login With Social Account
                </h2>
                <div
                  className="close-login-box"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_LOGIN_BOX",
                      payload: !state.showLoginBox,
                    })
                  }
                >
                  <ImCross />
                </div>
                <hr className="my-4" />
                <div className="form-signin">
                  <div className="btn btn-lg">
                    {/* <GoogleLogin
                      clientId="120077512862-8h225ckataa6onsoe2tc3di8slet3dvp.apps.googleusercontent.com"
                      buttonText="SignIn With Google"
                      onSuccess={handleGoogleResponse}
                      onFailure={handleFailure}
                    /> */}
                    <button
                      className="btn btn-success"
                      onClick={() => handleAuth("google")}
                    >
                      Login With Google
                    </button>
                  </div>
                  <div className="btn btn-lg">
                    <button
                      className="btn btn-info"
                      onClick={() => handleAuth("facebook")}
                    >
                      Login With Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
