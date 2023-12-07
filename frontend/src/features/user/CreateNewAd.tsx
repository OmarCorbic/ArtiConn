import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../auth/authSlice";
import { useCreateAdMutation } from "../ads/adsApiSlice";
import toast from "react-hot-toast";

const CreateNewAd = () => {
  const loggedInUserId = useSelector(selectCurrentUserId);
  const [createAd] = useCreateAdMutation();
  const [showForm, setShowForm] = useState(false);
  const [adData, setAdData] = useState({
    userId: loggedInUserId,
    title: "",
    description: "",
    payout: 0,
    payoutType: "",
    city: "",
    type: "",
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await createAd({ body: adData }).unwrap();
      console.log(response);
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err);
    }
  };
  const handleInputChange = (e: any) => {
    setAdData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className={`flex flex-col mt-3`}>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className={`flex text-sm py-2 border w-full rounded-full px-2 items-center justify-start gap-3`}
      >
        <span className="w-10 rounded-full h-10 text-[35px] text-white bg-blue-400 flex items-center justify-center">
          {showForm ? "-" : "+"}
        </span>
        <span>Create a new ad</span>
      </button>

      <form onSubmit={handleFormSubmit}>
        <div
          className={`${
            showForm ? "max-h-60 px-4 py-3 mt-3" : "max-h-0"
          }  text-slate-600 overflow-hidden grid grid-cols-2 grid-rows-6 duration-500 items-center bg-slate-200 rounded-3xl text-sm w-full gap-2
            `}
        >
          <div className=" col-span-2 font-bold bg-slate-100 h-6 w-full rounded-md overflow-hidden">
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              name="title"
              className="w-full h-full px-2 outline-none"
            />
          </div>

          <div className="ml-4 col-span-2 h-full row-span-2 bg-slate-100 rounded-md overflow-hidden">
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
              name="description"
              className="w-full h-full px-2 outline-none"
            />
          </div>
          <div className="h-6 w-full bg-slate-100 rounded-md overflow-hidden flex">
            <input
              onChange={handleInputChange}
              type="number"
              placeholder="Payout"
              name="payout"
              className="w-full h-full px-2 outline-none"
            />
            <span>/</span>
            <select
              onChange={handleInputChange}
              className="outline-none"
              name="payoutType"
            >
              <option value="m">m</option>
              <option value="m2">m{String.fromCharCode(0xb2)}</option>
              <option value="hr">hr</option>
              <option value="flat">flat</option>
            </select>
          </div>
          <div className="row-span-2 px-2 w-full  bg-white rounded-md justify-self-center ">
            <p>Type</p>
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleInputChange}
                type="radio"
                value="service"
                id="service"
                name="type"
              />
              <label htmlFor="service">Service</label>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleInputChange}
                type="radio"
                value="demand"
                id="demand"
                name="type"
              />
              <label htmlFor="demand">Demand</label>
            </div>
          </div>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="City"
            name="city"
            className="w-full h-full px-2 outline-none"
          />
          {adData.type === "demand" && (
            <input
              onChange={handleInputChange}
              type="date"
              placeholder="Date"
              name="date"
              className="w-full h-full px-2 outline-none rounded-md"
            />
          )}
          <button
            type="submit"
            className="w-full col-start-2 bg-blue-400 rounded-full text-white py-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewAd;
