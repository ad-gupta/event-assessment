import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ evt }) => {
  return (
    <div key={evt.name} className="bg-white shadow-md rounded-lg overflow-hidden m-5 p-5 w-64 h-[50vh]">
      <Link to={`/get-details/${evt._id}`}>
        <img
          src="./poster.jpeg"
          alt={evt.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{evt.name}</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Assign To:</span> {evt.assignTo}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
