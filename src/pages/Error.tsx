import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        404 - Not Found
      </h1>
      <p className="text-gray-400 mb-8">
        Nothing to see here. The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-purple-500"
      >
        Go Home
      </button>
    </div>
  );
}
