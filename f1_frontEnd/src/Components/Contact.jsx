import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [feedback, setFeedback] = useState("");
  const handleFormSubmit = (e) => {
    const url = import.meta.CONTACT_API_URL;
    axios.post(
      url,
      {
        message: feedback,
      },
      { headers: { Accept: "application/json" } }
    );
    e.preventDefault();
  };
  return (
      <div className="w-full lg:max-w-[900px] bg-[#38343473]">
          <p className="text-lg text-red-600">FeedBacks</p>
      <form onSubmit={handleFormSubmit}>
        <textarea maxLength={300} placeholder="Any Feedbacks?"></textarea>
        <button className="" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
