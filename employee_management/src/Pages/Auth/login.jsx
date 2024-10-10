import React from "react";
import { Login } from "../../Redux/actions/userActions";
import { useDispatch } from "react-redux";
import { setPageLoader } from "../../Redux/reducers/userReducers";
import { Navigate, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    dispatch(setPageLoader(true))
    const userEntry = {
      username: email,
      password,
    }
    dispatch(Login(userEntry,navigate))

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {/* <a href="#">Forgot your password?</a> */}
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
