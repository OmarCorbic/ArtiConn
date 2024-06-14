import { useState } from "react";
import { useGetProfilePhotoQuery } from "./userApiSlice";
import Spinner from "../../components/Spinner";

type Props = {
  userId: number | string | null;
};

const ProfilePhoto = ({ userId }: Props) => {
  const {
    data: profilePhoto,
    error,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
  } = useGetProfilePhotoQuery({ userId });
  const [urlFailed, setUrlFailed] = useState(false);

  if (isLoading || isUninitialized || isFetching) {
    return <Spinner />;
  }
  if (isError) {
    console.log(error);
    return <div>Default</div>;
  }
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
