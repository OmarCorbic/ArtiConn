import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../auth/authSlice";

type Props = {
  handleFormSubmit: (data: any) => void;
  handleCancel: () => void;
  initialValues?: any;
};

const AdForm = ({ handleFormSubmit, handleCancel, initialValues }: Props) => {
  const loggedInUserId = useSelector(selectCurrentUserId);

  const [adData, setAdData] = useState({
    userId: loggedInUserId,
    title: initialValues?.title ? initialValues.title : "",
    description: initialValues?.description ? initialValues.description : "",
    payout: initialValues?.payout ? initialValues.payout : 0,
    payoutType: initialValues?.payoutType ? initialValues.payoutType : "hr",
    city: initialValues?.city ? initialValues.city : "",
    type: initialValues?.type ? initialValues.type : "",
    date: initialValues?.formatted_date ? initialValues.formatted_date : "",
  });

  const handleInputChange = (e: any) => {
    setAdData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submit = (e: any) => {
    e.preventDefault();
    handleFormSubmit({ ...adData });
    // handleCancel();
  };

  return (
    <form
      className="py-1 px-2 grid grid-cols-2 grid-rows-6 items-center bg-slate-100 rounded-sm text-sm w-full gap-2"
      onSubmit={submit}
    >
      <div className=" col-span-2 font-bold bg-slate-100 h-6 w-full rounded-md overflow-hidden border">
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Title"
          value={adData?.title}
          name="title"
          className="w-full h-full px-2 outline-none"
        />
      </div>

      <div className="ml-4 col-span-2 h-full row-span-2 bg-slate-100 rounded-md overflow-hidden border">
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Description"
          value={adData?.description}
          name="description"
          className="w-full h-full px-2 outline-none"
        />
      </div>
      <div className="w-full bg-slate-100 rounded-md overflow-hidden flex h-full border">
        <input
          onChange={handleInputChange}
          type="number"
          placeholder="Payout"
          value={adData?.payout}
          name="payout"
          className="w-full h-full px-2 outline-none"
        />
        <span className="flex items-center bg-white">/</span>
        <select
          onChange={handleInputChange}
          className="outline-none"
          name="payoutType"
        >
          <option value="hr">hr</option>
          <option value="flat">flat</option>
          <option value="m">m</option>
          <option value="m2">m{String.fromCharCode(0xb2)}</option>
        </select>
      </div>
      {!initialValues && (
        <div className="row-span-2 px-2 w-full  bg-white rounded-md justify-self-center h-full border">
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
      )}
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="City"
        value={adData?.city}
        name="city"
        className="w-full h-full px-2 outline-none rounded-md border"
      />
      {adData.type === "demand" && (
        <input
          onChange={handleInputChange}
          type="date"
          placeholder="Date"
          value={adData?.date}
          name="date"
          className="w-full h-full px-2 outline-none rounded-md border"
        />
      )}
      <div className="flex gap-2 col-span-2 ">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-blue-400 rounded-full text-white py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full bg-blue-400 rounded-full text-white py-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdForm;
