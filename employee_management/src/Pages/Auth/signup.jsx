import React from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../Redux/actions/userActions";
import { setPageLoader } from "../../Redux/reducers/userReducers";
import { Alphabetic, Numeric } from "../../Utilities/commonFunctions";

const SignUpForm = ({handleOnClick}) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault(); 
    
    const userEntry = { ...state , role: 0}
    dispatch(setPageLoader(true))
    dispatch(RegisterUser(userEntry))
    setTimeout(() => {
      handleOnClick("login")
    },2000)
    
    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>        
        <input
          type="text"
          name="name"
          onKeyPress={(e) => Alphabetic(e)}
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}          
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          onKeyPress={(e) => Numeric(e)}
          name="phone"
          value={state.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
