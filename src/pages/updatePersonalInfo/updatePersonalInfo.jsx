import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import apiBase from "../../utils/apiBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePassword from "../../components/updatePassword/updatePassword";

function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // Fetch user details from the /users/me endpoint
  const { data, isError, error } = useQuery(
    "fetchUserData",
    async () => {
      const response = await fetch(`${apiBase}/users/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log("Fetched user data:", data); // Log fetched user data
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setUsername(data.userName || ""); // Ensure the field matches 'userName'
      },
      onError: () => {
        toast.error("Failed to fetch user data");
      },
    },
  );

  // Mutation for updating profile
  const mutation = useMutation(
    async (updatedInfo) => {
      const response = await fetch(`${apiBase}/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedInfo),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName, email, username });
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <h3 className="text-xl font-medium text-gray-700">
          Personal Information
        </h3>

        <div className="flex flex-col">
          <label className="text-gray-600">First Name</label>
          <input
            type="text"
            name="firstName"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Email Address</label>
          <input
            type="email"
            name="email"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
        >
          {mutation.isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <UpdatePassword />

      <ToastContainer />
    </div>
  );
}

export default UpdateProfile;
