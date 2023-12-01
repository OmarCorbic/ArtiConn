import electricianPhoto from "../../images/electrician.jpg";
import maidPhoto from "../../images/maid.jpg";
import plumberPhoto from "../../images/plumber.jpg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-violet-600 h-screen flex flex-col  items-center  md:items-center md:justify-center">
      <div className="text-2xl font-bold text-white">Logo</div>
      <div className="h-full flex flex-col md:flex-row md:h-auto w-full justify-center md:rounded-tl-3xl md:rounded-br-3xl overflow-hidden">
        <div className="md:flex hidden gap-1 w-1/2 min-h-[500px]">
          <img
            className="h-full w-1/2"
            width={200}
            src={electricianPhoto}
            alt="Electrician photo"
          />
          <div className="flex flex-col gap-1 flex-grow w-1/2">
            <img
              className="h-1/2 w-full"
              width={200}
              src={maidPhoto}
              alt="Maid photo"
            />
            <img
              className="h-1/2 w-full"
              width={200}
              src={plumberPhoto}
              alt="Plumber photo"
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
