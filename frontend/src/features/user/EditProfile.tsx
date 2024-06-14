import { useState } from "react";
import { useGetUserInfoQuery } from "./userApiSlice";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import ProfilePhoto from "./ProfilePhoto";
import UserPhotoChange from "./UserPhotoChange";
import {
  useChangePasswordMutation,
  useEditUserInfoMutation,
} from "./userApiSlice";
import toast from "react-hot-toast";
import { validatePassword } from "../../utils/validation";

const initialInfoState = {
  username: "",
  email: "",
  biography: "",
  phoneNumber: "",
  skills: "",
};

const initialPasswordState = {
  currentPass: "",
  newPass: "",
  repeatPass: "",
};

const initialOptionsState = {
  username: false,
  email: false,
  biography: false,
  phoneNumber: false,
  skills: false,
  password: false,
};

const EditProfile = () => {
  const params = useParams();
  const { data: userInfo } = useGetUserInfoQuery({ userId: params?.id });
  const user = userInfo?.user || null;

  const [editUserInfo] = useEditUserInfoMutation();
  const [changePassword] = useChangePasswordMutation();

  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const [editedInfo, setEditedInfo] = useState(initialInfoState);
  const [editedPassword, setEditedPassword] = useState(initialPasswordState);
  const [changeOptions, setChangeOptions] = useState(initialOptionsState);

  const handleChangeInfo = (e: any) => {
    const field: string = e.target.name;
    const value: string = e.target.value;
    setEditedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitInfo = async (e: any) => {
    e.preventDefault();

    try {
      const response = await editUserInfo({
        userId: user?.userId,
        body: editedInfo,
      }).unwrap();

      toast.success(response?.data?.message || response?.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data?.message || err?.message || err);
    }

    setEditedInfo({ ...initialInfoState });
  };

  const handleChangePassword = (e: any) => {
    const field: string = e.target.name;
    const value: string = e.target.value;
    setEditedPassword((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitPassword = async (e: any) => {
    e.preventDefault();

    // validate password
    let errors = validatePassword(
      editedPassword.newPass,
      editedPassword.repeatPass
    );
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await changePassword({
        userId: user?.userId,
        body: editedPassword,
      }).unwrap();
      toast.success(response?.data?.message || response.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data?.message || err.message || err);
    }

    setEditedPassword(initialPasswordState);
  };

  const handleChangeOption = (option: string) => {
    setChangeOptions((prev: any) => ({
      ...prev,
      [option]: !prev[option],
    }));
    if (option === "password") {
      setEditedPassword({ ...initialPasswordState });
    } else {
      setEditedInfo((prev) => ({ ...prev, [option]: "" }));
    }
  };

  const hideModal = (e: any) => {
    if (e.target.id === "modalBackground") {
      setShowPhotoOptions(false);
    }
  };

  return (
    <div className="flex flex-col justify-center py-10 gap-5 ">
      {showPhotoOptions && (
        <Modal hideModal={hideModal}>
          <UserPhotoChange />
        </Modal>
      )}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowPhotoOptions(true)}
          className="border overflow-hidden border-slate-300 rounded-full w-[120px] h-[120px] flex items-center justify-center text-3xl font-bold"
        >
          <ProfilePhoto userId={user?.userId} />
        </button>
      </div>
      <div className="flex px-3 md:px-0 flex-col md:flex-row justify-center gap-4">
        {/* user info form */}
        <form
          onSubmit={handleSubmitInfo}
          className="w-full md:w-1/3 flex justify-start flex-col gap-4"
        >
          <div>
            <label
              className="flex items-center gap-2 justify-between text-violet-600 bg-gray-100 px-4 py-2 rounded-md mb-2"
              htmlFor="username"
            >
              Username
              <button
                type="button"
                onClick={() => handleChangeOption("username")}
              >
                <FaEdit />
              </button>
            </label>
            <div className="pl-3">
              {changeOptions.username ? (
                <input
                  className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                  type="text"
                  placeholder={user?.username}
                  value={editedInfo.username}
                  onChange={handleChangeInfo}
                  name="username"
                />
              ) : (
                user?.username
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 justify-between text-violet-600 bg-gray-100 px-4 py-2 rounded-md mb-2"
            >
              E-mail
              <button type="button" onClick={() => handleChangeOption("email")}>
                <FaEdit />
              </button>
            </label>
            <div className="pl-3">
              {changeOptions.email ? (
                <input
                  className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                  type="text"
                  placeholder={user?.email}
                  value={editedInfo.email}
                  onChange={handleChangeInfo}
                  name="email"
                />
              ) : (
                user?.email
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="biography"
              className="flex items-center gap-2 justify-between text-violet-600 bg-gray-100 px-4 py-2 rounded-md mb-2"
            >
              Biography
              <button
                type="button"
                onClick={() => handleChangeOption("biography")}
              >
                <FaEdit />
              </button>
            </label>
            <div className="pl-3">
              {changeOptions.biography ? (
                <textarea
                  name="biography"
                  onChange={handleChangeInfo}
                  value={editedInfo.biography}
                  className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl h-32 focus:border-violet-600"
                />
              ) : (
                user?.biography
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="flex items-center justify-between gap-2 text-violet-600 bg-gray-100 px-4 py-2 rounded-md mb-2"
            >
              Phone number
              <button
                type="button"
                onClick={() => handleChangeOption("phoneNumber")}
              >
                <FaEdit />
              </button>
            </label>
            <div className="pl-3">
              {changeOptions.phoneNumber ? (
                <input
                  className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                  type="number"
                  name="phoneNumber"
                  placeholder={user?.phoneNumber}
                  value={editedInfo.phoneNumber}
                  onChange={handleChangeInfo}
                />
              ) : (
                user?.phoneNumber
              )}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="py-2 px-5 bg-violet-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>

        {/* password form*/}
        <form
          onSubmit={handleSubmitPassword}
          className="w-full md:w-1/3 flex justify-start flex-col gap-4"
        >
          <div>
            <label
              htmlFor="password"
              className="flex items-center gap-2 justify-between text-violet-600 bg-gray-100 px-4 py-2 rounded-md mb-2"
            >
              Password
              <button
                type="button"
                onClick={() => handleChangeOption("password")}
              >
                <FaEdit />
              </button>
            </label>
            <div className="pl-3 flex flex-col gap-4">
              {changeOptions.password ? (
                <>
                  <div>
                    <label
                      className="text-slate-600 pl-3"
                      htmlFor="currentPass"
                    >
                      Current password
                    </label>
                    <input
                      className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                      type="password"
                      name="currentPass"
                      value={editedPassword.currentPass}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 pl-3" htmlFor="newPass">
                      New Password
                    </label>
                    <input
                      className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                      type="password"
                      name="newPass"
                      value={editedPassword.newPass}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 pl-3" htmlFor="repeatPass">
                      Repeat new password
                    </label>
                    <input
                      className="w-full outline-none border border-slate-300 px-2 py-1 rounded-xl focus:border-violet-600"
                      type="password"
                      name="repeatPass"
                      value={editedPassword.repeatPass}
                      onChange={handleChangePassword}
                    />
                  </div>
                </>
              ) : (
                user?.password
              )}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="py-2 px-5 bg-violet-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
