import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <div className="py-10 space-y-4 divide-y-2 ">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="px-4 pt-4 ">
          <div className="w-full rounded-md bg-slate-300 aspect-video"></div>
          <h3 className="mt-2 text-gray-700 text-ls">Let Try Hello</h3>
        </div>
      ))}
      <button className="fixed p-4 text-white transition-colors bg-orange-400 border-transparent rounded-full shadow-xl cursor-pointer bottom-24 right-5 hover:bg-orange-500 active:bg-orange-600">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Live;
