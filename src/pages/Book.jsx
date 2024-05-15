import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { RxAvatar } from "react-icons/rx";
import { CiStickyNote } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../data";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const Book = () => {
  const [eventName, setEventName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null); // Change to null
  const [note, setNote] = useState("");
  const navigate = useNavigate();

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
      navigate("/get");
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
    <div className="container w-[50%] mx-auto bg-slate-50 mt-5 rounded-md p-10 min-h-[90vh] max-sm:w-full max-sm:mt-0">
      <div className="flex items-center justify-between">
        <div className="">
          <button
            onClick={handleSubmit}
            className="text-rose-500 bg-white rounded-full border-red-400 border-2"
          >
            <TiTick />
          </button>
        </div>
        <div className=" text-rose-500 text-xl">
          <Link to="/">
            <IoClose />
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          className="border pl-5 h-16 border-gray-300 p-3 rounded-3xl w-full mb-2 text-rose-600 font-bold text-xl"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="border pl-5 text-gray-600 border-gray-300 p-3 font-bold rounded-3xl w-full mb-4"
        />
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center -mt-1 justify-center gap-2 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <RxAvatar size={20} style={{ color: "tomato" }} />
            <p className="text-lg font-semibold max-sm:text-sm italic text-gray-700">
              {" "}
              Assign_to:{" "}
            </p>
          </div>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "40px",
                marginBottom: "10px",
                padding: "7px"
              }),
            }}
            options={options}
            value={selectedVendor}
            className="w-[75%] font-semibold"
            onChange={handleVendorChange}
            getOptionLabel={(option) => (
              <div className="flex items-center text-red p-2">
                <img
                  src={option.image}
                  alt={option.label}
                  className="h-6 w-6 mr-2 rounded-full"
                />
                <p
                  style={{ textShadow: "0.5px 1px green" }}
                  className="font-semibold mr-2 text-teal-500 text-xs"
                >
                  {option.label}
                </p>
              </div>
            )}
          />
        </div>
        <div className="flex items-center gap-2 justify-between mt-2">
          <div className="flex items-center -mt-4 justify-center gap-2 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <CiStickyNote style={{ color: "tomato" }} size={20} />
            <p className="text-lg font-semibold max-sm:text-sm italic text-gray-700">
              {" "}
              Note:{" "}
            </p>
          </div>
          <textarea
            placeholder="Note"
            value={note}
            onChange={handleNoteChange}
            className="border border-gray-300 pt-3 p-3 pl-5 rounded-3xl w-[80%] mb-4 resize-none"
          />
        </div>
      </div>
      <button
          onClick={handleSubmit}
          className="bg-rose-400 h-14 w-full text-white rounded-3xl text-xl font-sans mt-10"
        >
          Submit
        </button>
    </div>
  );
};

export default Book;
