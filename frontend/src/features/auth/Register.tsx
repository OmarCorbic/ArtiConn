import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useRegisterMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
} from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    verificationCode: "",
    password: "",
    repeatPassword: "",
    biography: "",
    phoneNumber: "",
    skills: [],
  };

  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [formPage, setFormPage] = useState(1);
  const [registerData, setRegisterData] = useState(initialState);

  const handleNextPage = () => {
    const { username, password, repeatPassword } = registerData;

    if (formPage === 3) {
      if (!username) {
        return toast.error("Username is required");
      }
      if (!password || password.length <= 8) {
        return toast.error("Password must be longer than 8 characters");
      }
      if (password !== repeatPassword) {
        return toast.error("Passwords do not match");
      }
    }

    setFormPage((prev) => {
      if (prev + 1 < 6) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleInputChange = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await register({ ...registerData }).unwrap();
      console.log(response);
      toast.success(response?.data?.message || response.message);
      navigate("/auth");
    } catch (err: any) {
      console.log(err);
      toast.error(err.data?.message || err.message || err);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      if (formPage !== 5) {
        e.preventDefault();
        return;
      } else {
        handleSubmitForm(e);
      }
    }
  };

  const handleSendCode = async () => {
    const { email } = registerData;
    const emailRegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegExp.test(email)) {
      return toast.error("Invalid E-mail");
    }

    try {
      const toastId = toast.loading("Sending verification code");
      const response: any = await sendVerificationCode({
        email,
      }).unwrap();
      console.log(response);
      toast.remove(toastId);
      toast.success(response?.data?.message || response?.message);
      setFormPage(2);
    } catch (error: any) {
      toast.remove();
      toast.error(error.data?.message || error.message || error);
    }
  };

  const handleVerifyCode = async () => {
    const { email, verificationCode } = registerData;

    if (!verificationCode) {
      return toast.error("Invalid code");
    }

    try {
      const toastId = toast.loading("Verifying code");
      const response: any = await verifyCode({
        email,
        code: verificationCode,
      }).unwrap();

      toast.remove(toastId);
      toast.success(response?.data?.message || response?.message);
      setFormPage(3);
      console.log(response);
    } catch (error: any) {
      toast.remove();
      toast.error(error.data?.message || error.message || error);
    }
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      className="bg-white text-sm rounded-t-2xl mt-auto pt-8 px-4 overflow-auto md:mt-0 md:rounded-tr-none md:w-1/2 md:px-10 md:rounded-t-none "
    >
      <div className="flex flex-col gap-3">
        <div className="text-xl font-bold text-violet-600 text-center">
          Register
        </div>
        {formPage === 1 && (
          <>
            <div className="text-center text-slate-500  py-2">
              A 6 digit code will be sent to this e-mail address for
              verification.
              <br />
              <br />
              Code will expire in 10 minutes
            </div>
            <div className="mb-2 ml-3 text-slate-600">
              E-mail <span className="text-red-400">*</span>
            </div>
            <input
              className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
              type="text"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
            />

            <button
              className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
              type="button"
              onClick={handleSendCode}
            >
              Send Code
            </button>
          </>
        )}
        {formPage === 2 && (
          <>
            <div className="text-center text-slate-500  py-2">
              A 6 digit code has been sent to address {registerData.email} for
              verification.
              <br />
              <br />
              Code will expire in 10 minutes
            </div>
            <div className="mb-2 ml-3 text-slate-600">
              Verification code <span className="text-red-400">*</span>
            </div>
            <input
              className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
              type="number"
              max={90000}
              name="verificationCode"
              value={registerData.verificationCode}
              onChange={handleInputChange}
            />

            <button
              className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
              type="button"
              onClick={handleVerifyCode}
            >
              Verify Code
            </button>
          </>
        )}

        {formPage === 3 && (
          <>
            <div className="text-center text-slate-500  py-2">
              These are the required fields
            </div>
            <div>
              <div className="mb-2 ml-3 text-slate-600">
                Username <span className="text-red-400">*</span>
              </div>
              <input
                className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                type="text"
                name="username"
                value={registerData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="mb-2 ml-3 text-slate-600">
                Password <span className="text-red-400">*</span>
              </div>
              <input
                className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 ml-3 text-slate-600">
                Repeat password <span className="text-red-400">*</span>
              </div>
              <input
                className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                type="password"
                name="repeatPassword"
                value={registerData.repeatPassword}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
              type="button"
              onClick={handleNextPage}
            >
              Next
            </button>
          </>
        )}
        {formPage === 4 && (
          <>
            <div className="text-center text-slate-500  py-2">
              You can choose to tell others more about yourself
            </div>
            <div>
              <div className="mb-2 ml-3 text-slate-600">Biography</div>
              <textarea
                name="biography"
                onChange={handleInputChange}
                className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl h-32 focus:border-violet-600"
              />
            </div>
            <div>
              <div className="mb-2 ml-3 text-slate-600"> Phone number</div>
              <input
                className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                type="number"
                name="phoneNumber"
                value={registerData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
              type="button"
              onClick={handleNextPage}
            >
              {!registerData.biography && !registerData.phoneNumber
                ? "Skip"
                : "Next"}
            </button>
          </>
        )}
        {formPage === 5 && (
          <>
            <div className="text-center text-slate-500  py-2">
              You can choose skills that describe you and your work more
              precisely
            </div>
            <div>
              <div className="mb-2 ml-3 text-slate-600">Skills</div>
            </div>
            <button
              className="bg-violet-800 py-2 rounded-xl w-32 cursor-pointer text-white ml-auto"
              type="button"
              onClick={handleSubmitForm}
            >
              Submit
            </button>
          </>
        )}
        <div className="text-center text-slate-500 py-4">
          Already have an account?{" "}
          <Link to="/auth" className="text-violet-500 font-bold ">
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
