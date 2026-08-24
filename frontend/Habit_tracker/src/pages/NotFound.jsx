import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-6">

            <div className="text-center">

                <p className="text-blue-600 font-semibold text-lg">
                    404
                </p>

                <h1 className="text-5xl font-bold text-gray-900 mt-2">
                    Page Not Found
                </h1>

                <p className="text-gray-600 mt-4 max-w-md">
                    Sorry, the page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Go to Home
                </Link>

            </div>

        </div>
    );
};

export default NotFound;