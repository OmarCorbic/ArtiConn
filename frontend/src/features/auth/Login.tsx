import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import { validateEmail } from "../../utils/validation";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [loginData, setLoginData] = useState(initialState);
  const [persist, setPersist] = usePersist();

  const handleInputChange = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const { email } = loginData;

    // validation
    let errors = validateEmail(email);
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await login({ ...loginData }).unwrap();
      const accessToken = response.accessToken || null;
      if (accessToken) {
        dispatch(setCredentials({ accessToken }));
        toast.success(response?.data?.message || response.message);
        navigate("/private");
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err);
    }
  };

  const togglePersist = () => setPersist((prev: boolean) => !prev);

  return (
    <form
      className="bg-white text-sm flex flex-col justify-center min-h-[400px] rounded-t-2xl mt-auto pt-8 px-4 overflow-auto md:mt-0 md:rounded-tr-none md:w-1/2 md:py-0 md:px-10 md:rounded-t-none "
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col gap-3">
        <div className="text-xl font-bold text-violet-600 text-center">
          Log in
        </div>
        <div>
          <div className="mb-2 ml-3 text-slate-600">
            E-mail <span className="text-red-400">*</span>
          </div>
          <input
            className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <div className="mb-2 ml-3 text-slate-600">
            Password <span className="text-red-400">*</span>
          </div>
          <input
            autoComplete="true"
            className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 ml-3 text-slate-600">
          <div>Stay logged in?</div>
          <input onChange={togglePersist} checked={persist} type="checkbox" />
        </div>

        <button
          className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
          type="submit"
        >
          Submit
        </button>

        <div className="text-center text-slate-500 py-4">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-violet-500 font-bold">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
