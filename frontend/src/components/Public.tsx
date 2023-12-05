import { Link } from "react-router-dom";
import Blob from "./Blob";
import renovate1 from "../images/renovation-nobg.png";
import renovate2 from "../images/renovation2-nobg.png";
import renovate3 from "../images/renovation3-nobg.png";
import paint from "../images/paint-nobg.png";
import electrician from "../images/electrician-nobg.png";
import plumber from "../images/plumbing-nobg.png";

const images = [renovate1, renovate2, renovate3, paint, electrician, plumber];
// const images = [renovate1];

const Public = () => {
  return (
    <div className="flex-col flex gap-5">
      <div className="text-[50px] text-center">
        <span className="text-white  font-bold">Arti</span>
        <span className="text-cyan-200  ml-1  font-bold">Conn</span>
        <p className="text-sm font-bold text-white">
          Everything you need done.
        </p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-5 items-center justify-center">
        <div className="hidden relative border-dashed border-4 border-white rounded-full h-[600px] w-[600px] animate-spin-slow md:flex items-center justify-center">
          <Link
            className="text-xl bg-lime-400 px-8 py-4 rounded-full text-white font-bold animate-bounce"
            to="auth"
          >
            Join now
          </Link>
          {images.map((iSrc, index) => {
            const angle = (index / images.length) * 360; // Calculate angle for each element
            const radius = 190; // Set the desired radius of the circle
            const size = 200;

            // Calculate position using trigonometry
            const xPos = radius * Math.cos((angle * Math.PI) / 180);
            const yPos = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className={`absolute`}
                style={{
                  left: `33%`,
                  top: `33%`,
                  transform: `translate(${xPos}px, ${yPos}px)`,
                }}
              >
                <Blob size={size} imgSrc={iSrc} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center w-full lg:w-1/2 text-center gap-5">
          <h1 className="text-3xl text-white font-bold">
            Welcome to ArtiConn!
          </h1>
          <p className="text-cyan-100 lg:w-2/3 w-80">
            A place where Craftsmanship Meets Opportunity - Your Bridge to
            Skilled Services and Seamless Connections!
          </p>
          <Link
            className="md:hidden text-xl bg-lime-400 px-8 py-4 rounded-full text-white font-bold animate-bounce"
            to="auth"
          >
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Public;
