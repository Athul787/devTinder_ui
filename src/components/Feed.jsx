import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      // console.log("HII");
      // console.log(res.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err.message);
      // return <p>{error}</p>;
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (error) {
    return <p>{error}</p>;
  }
  if (!feed) {
    return;
  }
  if (feed.length <= 0) {
    console.log(feed);
    return <h1 className="flex justify-center my-10">No new users found</h1>;
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
  // return <div>Feed</div>;
};

export default Feed;
