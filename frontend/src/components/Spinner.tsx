const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="border border-cyan-100 rounded-full w-7 h-7">
        <div className="w-full h-full shadow-sm shadow-cyan-600 rounded-full animate-faster-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
