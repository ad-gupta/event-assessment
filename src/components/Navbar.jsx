import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 h-20 py-6">
      <div className="container mx-auto flex items-center justify-evenly">
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">
            <Link to="/">Event Booking App</Link>
          </span>
        </div>
        <div>
          <Link
            to="/book"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
