import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { RxAvatar } from "react-icons/rx";
import { CiStickyNote } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../data";

const Book = () => {
  const [eventName, setEventName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null); // Change to null
  const [note, setNote] = useState("");
  const navigate = useNavigate()

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleVendorChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the capitalization of preventDefault
    try {
      let newEvent = await axios.post(`${api}/book`, {
        name: eventName,
        assignTo: selectedVendor.label,
        note: note,
        date: dateTime,
      });
      navigate('/get')
      toast.success("Your request has been recorded");
    } catch (error) {
      console.error("Error occurred while submitting:", error);
      toast.error("Failed to record your request");
    }
  };

  const options = [
    { value: 1, label: "Jammy Sam", image: "./poster.jpeg" },
    { value: 2, label: "John Sena", image: "./poster.jpeg" },
    { value: 3, label: "Jilly Mahi", image: "./poster.jpeg" },
  ];

  return (
    <div className="container w-[50%] mx-auto bg-gradient-to-r from-pink-200 via-green-300 to-indigo-300 mt-5 rounded-md p-10 min-h-[85vh] max-sm:w-full max-sm:mt-0">
      <h1 className="text-3xl mb-4 text-blue-800 text-center font-bold">
        Event Details Modal
      </h1>
      <div className="mb-4 m-5">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          className="border border-gray-400 p-2 rounded-md w-full my-3"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="border border-gray-400 p-2 rounded-md w-full my-3"
        />
        <div className="flex items-center justify-evenly my-3">
          <div className="flex items-center justify-center gap-3 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <RxAvatar color="red" size={24} />
            <p className="text-xl max-sm:text-sm"> assign:- </p>
          </div>
          <Select
            options={options}
            value={selectedVendor}
            onChange={handleVendorChange}
            className="w-[60%] py-2"
            getOptionLabel={(option) => (
              <div className="flex items-center justify-center">
                <img
                  src={option.image}
                  alt={option.label}
                  className="h-6 w-6 mr-2 rounded-lg"
                />
                {option.label}
              </div>
            )}
          />
        </div>
        <div className="flex items-center justify-evenly">
          <div className="flex items-center justify-center gap-3 max-sm:gap-0">
            <CiStickyNote color="red" size={24} />
            <p className="text-xl max-sm:text-sm"> Note:- </p>
          </div>
          <textarea
            placeholder="Note"
            value={note}
            onChange={handleNoteChange}
            className="border ml-2 my-3 border-gray-400 p-2 rounded-md w-[60%] mb-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md float-right mr-10 my-5 w-32"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Book;
