import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { RxAvatar } from "react-icons/rx";
import { CiStickyNote } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../data";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
const getEventDetails = async (id) => {
  try {
    const { data } = await axios.get(`${api}/get/${id}`);
    return data.message;
  } catch (error) {
    return null;
  }
};

const EventDetails = () => {
  const [eventName, setEventName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(""); // Change to null
  const [note, setNote] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventDetails(id)
      .then((data) => {
        setEventName(data.name);
        const originalDateString = data.date;
        const dateObject = new Date(originalDateString);

        const formattedDateString = dateObject.toISOString().slice(0, 16);
        setDateTime(formattedDateString);
        setSelectedVendor({ label: data.assignTo, image: "/poster.jpeg" });
        setNote(data.note);
        setComments(data.comments);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

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

  const handleUpdate = async () => {
    let event = await axios.put(`${api}/update-event/${id}`, {
      name: eventName,
      date: dateTime,
      assignTo: selectedVendor.label,
      note,
    });
    navigate("/");

    toast.success("Your request has been recorded");
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== "") {
      const newComment = {
        name: "Jammy Rode",
        comment: commentText,
      };

      await axios.post(`${api}/add-comment/${id}`, newComment);

      setComments([newComment, ...comments]);
      setCommentText("");
      toast.success("Comment added successfully");
    } else {
      toast.error("Please enter a comment");
    }
  };

  const handleEditComment = async (cid) => {
    const editedCommentText = prompt(
      "Edit your comment:",
      comments.find((comment) => comment._id === cid).text
    );
    if (editedCommentText !== null) {
      const updatedComments = comments.map((comment) =>
        comment._id === cid
          ? { ...comment, comment: editedCommentText }
          : comment
      );

      await axios.put(`${api}/update-comment/${id}`, {
        commentId: cid,
        comment: editedCommentText,
      });
      setComments(updatedComments);
      toast.success("Comment edited successfully");
    }
  };

  const handleDeleteComment = async (cid) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = comments.filter((comment) => comment._id !== cid);

      await axios.delete(`${api}/delete-comment/${id}`, {
        data: {
          commentId: cid,
        },
      });
      setComments(updatedComments);
      toast.success("Comment deleted successfully");
    }
  };

  const deleteEvent = async (cid) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`${api}/delete-event/${id}`);
      navigate("/");
      toast.success("Event deleted successfully");
    }
  };

  const options = [
    { value: 1, label: "Jammy Sam", image: "/poster.jpeg" },
    { value: 2, label: "John Sena", image: "/poster.jpeg" },
    { value: 3, label: "Jilly Mahi", image: "/poster.jpeg" },
  ];

  const customStyles = {
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: blue,
      borderRadius: "50%",
    }),
  };

  return (
    <div className="container w-[50%] mx-auto bg-slate-50 mt-5 rounded-md p-10 min-h-[80vh] max-sm:w-full max-sm:mt-0">
      <div className="flex items-center justify-between">
        <div className="">
          <div
            onClick={handleUpdate}
            className="text-rose-500 bg-white rounded-full border-red-400 border-2"
          >
            <TiTick />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={deleteEvent} className=" text-rose-500">
            <FaTrash />
          </button>
          <div className=" text-rose-500 text-xl">
            <Link to="/">
              <IoClose />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-4 m-5">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          className="border pl-5 border-gray-300 p-3 rounded-3xl w-full mb-2 text-rose-500 font-bold text-xl"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="border pl-5 text-gray-600 border-gray-300 p-3 font-bold rounded-3xl w-full mb-2"
        />
        <div className="flex items-center justify-evenly">
          <div className="flex items-center justify-center gap-2 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <RxAvatar size={20} style={{ color: "tomato" }} />
            <p className="text-lg max-sm:text-sm italic text-gray-700">
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
                padding: "5px",
              }),
            }}
            options={options}
            value={selectedVendor}
            className="w-[60%] font-semibold"
            onChange={handleVendorChange}
            getOptionLabel={(option) => (
              <div className="flex items-center justify-center text-red p-2">
                <img
                  src={option.image}
                  alt={option.label}
                  className="h-6 w-6 mr-2 rounded-lg"
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
        <div className="flex items-center justify-evenly">
          <div className="flex items-center justify-center gap-2 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <CiStickyNote style={{ color: "tomato" }} size={20} />
            <p className="text-lg max-sm:text-sm italic text-gray-700">
              {" "}
              Note:{" "}
            </p>
          </div>
          <textarea
            placeholder="Note"
            value={note}
            onChange={handleNoteChange}
            className="border border-gray-300 p-3 pl-5 rounded-3xl w-[60%] mb-2"
          />
        </div>
      </div>
      <hr />
      <div className="mb-4 mt-5">
        <h2 className="text-2xl font-semibold italic text-gray-500 mb-2">
          Comments
        </h2>

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-center mb-2 my-3 rounded-md w-full gap-2 border-2 border-slate-100 p-2"
          >
            <img
              src="/poster.jpeg"
              alt="User Avatar"
              className="w-11 h-11 rounded-full mr-2 gap-3 p-2"
            />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <span
                  style={{ textShadow: "1px 1px green" }}
                  className="font-semibold mr-2 text-teal-500"
                >
                  {comment.name}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEditComment(comment._id)}
                    className="mr-2 text-slate-400"
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <FaTrash color="tomato" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 w-full">
          <img
            src="/poster.jpeg"
            alt="User Avatar"
            className="w-11 h-11 rounded-full mr-2 gap-3 p-2"
          />
          <div className="flex items-center justify-center w-full">
            <input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="border border-gray-400 p-4 rounded-3xl w-full mb-2"
            />
            <div onClick={handleCommentSubmit} className="text-rose-500 ml-[-4vh] pb-2 pr-8 cursor-pointer">
              <LuSendHorizonal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
