export const LoadingUser = () => (
  <div className="text-blue-800 h-screen rounded-xl w-full flex flex-col items-center justify-center">
    <svg
      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-70"
        cx="12"
        cy="12"
        r="10"
        stroke="#000000"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <div className="text-gray-900 font-semibold mt-5">Yükleniyor</div>
  </div>
);
