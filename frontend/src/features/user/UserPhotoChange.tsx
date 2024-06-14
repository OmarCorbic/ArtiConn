import { useState } from "react";
import { useUpdateProfilePhotoMutation } from "./userApiSlice";
import toast from "react-hot-toast";
type PhotoState = {
  photoPreview: string;
  photoAsFile: File;
};

const UserPhotoChange = () => {
  const [profilePhoto, setProfilePhoto] = useState<PhotoState | null>(null);
  const [updateUserPhoto] = useUpdateProfilePhotoMutation();
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

  // handling file input
  const handlePhotoUpload = async (e: any) => {
    const file = e.target.files[0];

    if (file.size > 1000000) {
      return toast.error("Size of the photo must be under 1 mb");
    } else if (!allowedImageTypes.includes(file.type)) {
      return toast.error("Invalid file type");
    }

    setProfilePhoto({
      photoPreview: URL.createObjectURL(e.target.files[0]),
      photoAsFile: e.target.files[0],
    });
  };

  // handling request to the server
  const handlePhotoUpdate = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePhoto) {
      formData.append("profile-photo", profilePhoto?.photoAsFile);

      const loading = toast.loading("Updating profile photo...");
      try {
        const response = await updateUserPhoto({
          body: formData,
        }).unwrap();

        toast.remove(loading);
        toast.success(response?.data?.message || response?.message);
      } catch (err: any) {
        toast.remove(loading);
        toast.error(err.data?.message || err.message || err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-3 overflow-auto ">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handlePhotoUpdate}
      >
        <label
          htmlFor="profilePhotoUpload"
          className="border py-2 px-5 rounded border-slate-300 cursor-pointer"
        >
          Upload photo
        </label>
        <input
          onChange={handlePhotoUpload}
          type="file"
          name="profilePhotoUpload"
          id="profilePhotoUpload"
          accept=".png, .jpg, .jpeg"
          className="hidden"
        />
        {profilePhoto && (
          <div className=" rounded-full overflow-hidden w-[200px] h-[200px] object-center object-contain border">
            <img
              className={`w-full h-full object-contain`}
              src={profilePhoto.photoPreview}
            ></img>
          </div>
        )}
        {profilePhoto && (
          <button
            className="border py-2 px-5 rounded border-slate-300 "
            type="submit"
          >
            Save
          </button>
        )}
      </form>
      <div className="flex items-center w-full gap-1">
        <span className="border w-full"></span>{" "}
        <span className="text-slate-400">OR</span>
        <span className="border w-full"></span>
      </div>
      <p className="text-xs text-slate-500">
        Choose one of default avatars below
      </p>
    </div>
  );
};

export default UserPhotoChange;
