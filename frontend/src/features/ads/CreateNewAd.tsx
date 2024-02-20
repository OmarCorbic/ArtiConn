import { useState } from "react";

import { useCreateAdMutation } from "./adsApiSlice";
import toast from "react-hot-toast";
import AdForm from "./AdForm";

const CreateNewAd = () => {
  const [createAd] = useCreateAdMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleFormSubmit = async (e: any, adData: any) => {
    e.preventDefault();
    try {
      const response = await createAd({ body: adData }).unwrap();
      toast.success(response?.data?.message || response?.message || response);
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err);
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const toggleShowCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  return (
    <div className={`flex flex-col mt-3 md:w-1/3`}>
      <button
        onClick={toggleShowCreateForm}
        className={`flex text-sm py-2 border w-full rounded-full px-2 items-center justify-start gap-3`}
      >
        <span className="w-10 rounded-full h-10 text-[35px] text-white bg-blue-400 flex items-center justify-center">
          {showCreateForm ? "-" : "+"}
        </span>
        <span>Create a new ad</span>
      </button>

      <div
        className={`${
          showCreateForm ? "max-h-full" : "max-h-0  overflow-hidden"
        }`}
      >
        <AdForm
          handleCancel={handleCancelCreate}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default CreateNewAd;
