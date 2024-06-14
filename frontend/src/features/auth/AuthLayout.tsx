import electricianPhoto from "../../images/electrician.jpg";
import maidPhoto from "../../images/maid.jpg";
import plumberPhoto from "../../images/plumber.jpg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-violet-600 h-full">
      <div className="h-full flex flex-col md:flex-row w-full justify-center gap-1 overflow-hidden py-1">
        {/* <div className="md:flex hidden gap-1  min-h-[400px]">
          <img
            className="h-full w-1/2"
            width={200}
            src={electricianPhoto}
            alt="Electrician photo"
          />
          {/* <div className="flex flex-col gap-1 flex-grow w-1/2">
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
        </div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
