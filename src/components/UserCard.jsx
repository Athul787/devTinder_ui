import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const UserCard = (user) => {
  // console.log(user);
  const { firstName, lastName, photoUrl, gender, skills, about, _id } =
    user.user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      // console.log(userId + status);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      // console.log("Hi");
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Photo" className="w-45 h-50 my-8" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <div className="space-y-5">
            {gender && (
              <p>
                {gender.toLowerCase() === "male"
                  ? "M"
                  : gender.toLowerCase() === "female"
                    ? "F"
                    : gender}
              </p>
            )}
            <p>{about}</p>
          </div>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary mx-2"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
