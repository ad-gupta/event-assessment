import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { api } from "../data";

const Events = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/getAllEvents`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex items-center flex-wrap w-full m-auto justify-center">
      {event && event.map((evt) => <EventCard evt={evt} />)}
    </div>
  );
};

export default Events;
