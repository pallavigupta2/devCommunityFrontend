import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import UserCard from "./userCard";
import { useDispatch } from "react-redux";
import { addLoggedInUserData } from "../store/userSlice";

const EditProfile = ({ loggedInUser }) => {
  const [firstName, setFirstName] = useState(loggedInUser?.firstName);
  const [lastName, setLastName] = useState(loggedInUser?.lastName);
  const [aboutUs, setAboutUs] = useState(loggedInUser?.aboutUs);
  const [photoUrl, setPhotoUrl] = useState(loggedInUser?.photoUrl);
  const [age, setAge] = useState(loggedInUser?.age);
  const [gender, setGender] = useState(loggedInUser?.gender);
  const [skills, setskills] = useState(loggedInUser?.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const dispatch = useDispatch();
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender); // Save lowercase gender
    setIsGenderOpen(false); // Close dropdown
  };
  const skillArray = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");
  const handleSave = async () => {
    setError("");
    try {
      const updateProfile = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          aboutUs,
          photoUrl,
          age,
          gender,
          skills: skillArray,
        },
        { withCredentials: true }
      );
      dispatch(addLoggedInUserData(updateProfile?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setError(err?.response?.data);
      console.error(err);
    }
  };
  return (
    <div className=" flex justify-center my-10 mb-20">
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success bg-neutral text-white">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}{" "}
      <div className="mx-10 w-[60%]">
        <div className="card bg-neutral text-primary-content w-[100%] shadow-3xl">
          <div className="card-body p-[50px]">
            <h2 className="card-title text-2xl">Update Your Profile</h2>
            <div className="flex">
              <div className="w-[50%]">
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    About Us
                  </legend>
                  <textarea
                    className="textarea h-24 text-neutral"
                    placeholder="Bio"
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              <div className="w-[50%]">
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    Upload Photo
                  </legend>
                  {/* <input type="file" className="file-input text-neutral" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/> */}
                  <input
                    type="text"
                    className="input text-neutral"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">Skills</legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={skills}
                    onChange={(e) => setskills(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">Age</legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    Gender{" "}
                  </legend>

                  <div className="dropdown w-40">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 w-full"
                      onClick={() => isGenderOpen(true)}
                    >
                      {gender
                        ? gender.charAt(0).toUpperCase() + gender.slice(1)
                        : "Select Gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white rounded-box z-10 w-full p-2 shadow-md text-neutral"
                    >
                      <li>
                        <a onClick={() => handleGenderSelect("male")}>Male</a>
                      </li>
                      <li>
                        <a onClick={() => handleGenderSelect("female")}>
                          Female
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleGenderSelect("others")}>
                          Others
                        </a>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>
            </div>
            {error && <p className="text-red-400">{error}</p>}

            <div className="card-actions">
              <button className="btn mt-4" onClick={handleSave}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ aboutUs, firstName, lastName, photoUrl, skills, age, gender }}
      />
    </div>
  );
};

export default EditProfile;
