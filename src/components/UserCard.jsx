import React from "react";

const UserCard = (user) => {
  // console.log(user);
  const { firstName, lastName, photoUrl, gender, skills, about } = user.user;
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
            <button className="btn btn-primary mx-2">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
