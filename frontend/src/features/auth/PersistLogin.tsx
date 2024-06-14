import { Outlet, Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isSuccess, isError, error }] =
    useRefreshTokenMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh({}).unwrap();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isError) {
    console.log(error.status);
    if (error.status === 401) {
      content = <Navigate to="/auth" />;
    } else {
      content = <p className="errmsg">{`${error?.data?.message} - `}</p>;
    }
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
