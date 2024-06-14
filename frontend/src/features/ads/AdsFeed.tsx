import { useGetAllAdsQuery } from "./adsApiSlice";
import { useEffect, useState } from "react";
import AdPlaceholder from "./AdPlaceholder";
import AdsList from "./AdsList";
import { CiMenuBurger } from "react-icons/ci";
import Sidebar from "../../components/Sidebar";

const AdsFeed = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [queryArgs, setQueryArgs] = useState<any>({
    sort: "time-new",
    search: "",
    categories: [],
  });
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    isUninitialized,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllAdsQuery(
    { page, ...queryArgs },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      if (scrolledToBottom && !isFetching && !data.isEndOfList) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
        refetch();
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  const updateQueryArgs = (newArgs: any) => {
    setQueryArgs({ ...queryArgs, ...newArgs });
  };

  const handleSortChange = (e: any) => {
    console.log(e.target.value);
    setQueryArgs((prev: any) => ({ ...prev, sort: e.target.value }));
  };
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  if (isUninitialized || isLoading || isFetching) {
    return (
      <div className=" h-full justify-center px-1 py-2 flex flex-wrap gap-2">
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <div>{error.data?.message || error.message || error.status}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-2 border-b w-full  mr-auto">
        <button onClick={toggleSidebar}>
          <CiMenuBurger size={24} />
        </button>
        <div className="flex gap-2 items-center">
          <label htmlFor="sort">Sort</label>
          <select
            onChange={handleSortChange}
            className="px-3 py-1 outline-none border rounded-sm"
            name="sort"
          >
            <option value="time-new">Latest</option>
            <option value="time-old">Oldest</option>
            <option value="price-low">Cheapest</option>
            <option value="price-high">Most expensive</option>
          </select>
        </div>
      </div>
      <div className="relative h-full">
        {showSidebar && <Sidebar updateQueryArgs={updateQueryArgs} />}
        <AdsList ads={data?.ads} />
      </div>
    </div>
  );
};

export default AdsFeed;
