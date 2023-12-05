import blob1 from "../images/blobs/blob1.svg";
import blob2 from "../images/blobs/blob2.svg";
import blob3 from "../images/blobs/blob3.svg";
import blob4 from "../images/blobs/blob4.svg";
import blob5 from "../images/blobs/blob5.svg";
import blob6 from "../images/blobs/blob6.svg";
import blob7 from "../images/blobs/blob7.svg";

const blobs = [blob1, blob2, blob3, blob4, blob5, blob6, blob7];

type BlobProps = { imgSrc: string; size?: number };

const Blob = ({ imgSrc, size = 200 }: BlobProps) => {
  const rand = Math.floor(Math.random() * 7);
  return (
    <div
      className={`relative w-[${size.toString()}px] bg-no-repeat bg-cover h-[${size.toString()}px] flex items-center justify-center`}
    >
      <img className="absolute w-full h-full" src={blobs[rand]} alt="Blob" />
      <img className="absolute w-2/3 rounded-full" src={imgSrc} alt="img" />
    </div>
  );
};

export default Blob;
