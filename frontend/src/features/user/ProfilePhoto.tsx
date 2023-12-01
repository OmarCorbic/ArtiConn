import { useState } from "react";
import { useGetProfilePhotoQuery } from "./userApiSlice";

type Props = {
  userId?: string;
};

const ProfilePhoto = ({ userId }: Props) => {
  const { data: profilePhoto } = useGetProfilePhotoQuery({ userId });
  const [urlFailed, setUrlFailed] = useState(false);

  if (!profilePhoto?.url || urlFailed) {
    return <p>{profilePhoto?.username?.slice(0, 1).toUpperCase()}</p>;
  } else {
    return (
      <img
        className={`w-full h-full`}
        onError={() => setUrlFailed(true)}
        src={profilePhoto?.url}
      />
    );
  }
};

export default ProfilePhoto;
