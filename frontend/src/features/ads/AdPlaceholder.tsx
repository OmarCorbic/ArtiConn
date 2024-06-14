const AdPlaceholder = () => {
  return (
    <div className="animate-pulse grid grid-cols-2 grid-rows-4 items-center bg-slate-300 rounded-lg px-4 py-2 text-sm w-full gap-1 max-w-[400px]">
      <div className="font-bold bg-slate-100 h-6 w-full rounded-md"></div>
      <div className="overflow-hidden justify-self-end rounded-full w-[32px] h-[32px] bg-slate-100"></div>
      <div className="ml-4 col-span-2 h-10 bg-slate-100 rounded-md"></div>
      <div className="h-6 w-full bg-slate-100 rounded-md"></div>
      <div className="row-span-2 w-1/2 h-10 bg-slate-100 justify-self-end rounded-full"></div>
      <div className="flex gap-2 w-full h-6">
        <div className="w-full h-6 bg-slate-100 rounded-md"></div>
        <div className="w-full h-6 bg-slate-100 rounded-md"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
