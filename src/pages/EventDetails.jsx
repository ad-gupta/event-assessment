import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { RxAvatar } from "react-icons/rx";
import { CiStickyNote } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../data";
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

  const handleSubmit = async () => {
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
    if (window.confirm("Are you sure you want to delete this comment?")) {

      await axios.delete(`${api}/delete-event/${id}`);
      navigate('/');
      toast.success("Event deleted successfully");
    }
  };

  const options = [
    { value: 1, label: "Jammy Sam", image: "/poster.jpeg" },
    { value: 2, label: "John Sena", image: "/poster.jpeg" },
    { value: 3, label: "Jilly Mahi", image: "/poster.jpeg" },
  ];

  return (
    <div className="container w-[50%] mx-auto bg-gradient-to-r from-pink-200 via-green-300 to-indigo-300 mt-5 rounded-md p-10 min-h-[80vh] max-sm:w-full max-sm:mt-0">
      <h1 className="text-3xl mb-4 text-blue-800 text-center font-bold">
        Event Details Modal
      </h1>
      <button onClick={deleteEvent} className="float-right mt-[-10vh]">
        <FaTrash color="red" />
      </button>
      <div className="mb-4 m-5">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          className="border border-gray-400 p-2 rounded-md w-full mb-2"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="border border-gray-400 p-2 rounded-md w-full mb-2"
        />
        <div className="flex items-center justify-evenly">
          <div className="flex items-center justify-center gap-3 max-sm:gap-0">
            {/* Replace RxAvatar with your actual avatar component */}
            <RxAvatar color="red" size={24} />
            <p className="text-xl max-sm:text-sm"> Assign to:- </p>
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
            {/* Replace RxAvatar with your actual avatar component */}
            <CiStickyNote color="red" size={24} />
            <p className="text-xl max-sm:text-sm"> Assign to:- </p>
          </div>
          <textarea
            placeholder="Note"
            value={note}
            onChange={handleNoteChange}
            className="border border-gray-400 p-2 rounded-md w-[60%] mb-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md float-right mr-10 my-5 w-32"
        >
          Submit
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-center mb-2 my-3 bg-slate-100 rounded-md w-full gap-3"
          >
            <img
              src="/poster.jpeg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2 gap-3 p-2"
            />
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="font-semibold mr-2">{comment.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditComment(comment._id)}
                    className="mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <FaTrash color="red" />
                  </button>
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border border-gray-400 p-2 rounded-md w-full mb-2"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
