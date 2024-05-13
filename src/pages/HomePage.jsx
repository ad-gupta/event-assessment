import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="m-5 mt-3 bg-white h-[80vh] rounded-xl max-sm:h-[140vh]">
      <div className="flex items-center justify-evenly max-sm:flex-col-reverse">
        <div className="w-[50%] p-5 max-lg:w-[80%]">
          <h1 className="text-5xl font-bold py-3">Elevate Your Events</h1>
          <h1 className="text-4xl font-semibold text-blue-700 py-3">
            Event Excellence Guaranteed
          </h1>

          <p className="">
            Create unforgettable moments with our seamless event management
            solutions
          </p>
          <div className="font-semibold bg-blue-700 text-white p-2 rounded-md px-5 my-4 text-xl max-w-56">
            <Link to="/get"> Get Booked Events</Link>
          </div>
          <div className="font-semibold bg-blue-700 text-white p-2 rounded-md px-5 my-4 text-xl max-w-56">
            <Link to="/book"> Book an Event</Link>
          </div>
        </div>
        <div className="">
          <img
            src="./poster.jpeg"
            alt="Poster"
            className="h-[70vh] my-10 max-sm:h-[50vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
