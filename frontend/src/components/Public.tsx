import { Link } from "react-router-dom";
import Blob from "./Blob";
import renovate1 from "../images/renovation-nobg.png";
import renovate2 from "../images/renovation2-nobg.png";
import renovate3 from "../images/renovation3-nobg.png";
import paint from "../images/paint-nobg.png";
import electrician from "../images/electrician-nobg.png";
import plumber from "../images/plumbing-nobg.png";
import handshake from "../images/handshake.jpg";

const images = [renovate1, renovate2, renovate3, paint, electrician, plumber];
// const images = [renovate1];

const Public = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${handshake})` }}
        className="relative bg-cover bg-center flex flex-col-reverse lg:flex-row gap-5 items-center justify-center py-5"
      >
        <div className="absolute w-full h-full bg-black opacity-0 "></div>
        <div className=" hidden relative border-dashed border-4 border-white rounded-full h-[400px] w-[400px] md:flex items-center justify-center">
          <Link
            className="text-xl bg-yellow-500 py-2 px-3 rounded-full text-white font-bold"
            to="/auth/register"
          >
            Join now
          </Link>
          {images.map((iSrc, index) => {
            const angle = (index / images.length) * 360; // Calculate angle for each element
            const radius = 130; // Set the desired radius of the circle
            const size = 130;

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
        <div className="z-[1000] bg-black bg-opacity-40 rounded-full p-10 flex flex-col items-center w-full lg:w-1/2 text-center gap-5">
          <h1 className="text-3xl text-yellow-400 font-bold">
            Welcome to ArtiConn!
          </h1>
          <p className="text-white text-xs md:text-lg">
            A place where Craftsmanship Meets Opportunity - Your Bridge to
            Skilled Services and Seamless Connections!
          </p>
        </div>
      </div>
      <section className="bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Featured Jobs</h2>
        {/* Display featured job listings */}
      </section>

      <section className="bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
        {/* Display job listings */}
      </section>
    </>
  );
};

export default Public;
