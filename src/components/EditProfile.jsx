import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = (user) => {
  // user = user.user;
  user = user.user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <UserCard user={{ firstName, lastName, gender, photoUrl, about }} />
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96 my-10">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                placeholder={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="label">Gender</label>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn menu bg-base-100 text-gray-500 border-gray-500 text-left justify-start px-3"
                >
                  {gender[0].toUpperCase() + gender.slice(1)}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => setGender("Male")}>Male</a>
                  </li>
                  <li>
                    <a onClick={() => setGender("Female")}>Female</a>
                  </li>
                  <li>
                    <a onClick={() => setGender("Others")}>Others</a>
                  </li>
                </ul>
              </div>
              <label className="label">About</label>
              <input
                type="text"
                placeholder={about}
                className="input"
                onChange={(e) => setAbout(e.target.value)}
              />
              <label className="label">Photo URL</label>
              <input
                type="text"
                placeholder={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <label className="label">Skills</label>
              <input type="text" placeholder="Skills" className="input" />
              <p>{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
