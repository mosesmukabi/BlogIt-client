import React, { useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (passwords) => {
      const response = await fetch(`${apiBase}/auth/password`, {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update password");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      // Clear the form fields after a successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    // Trigger mutation for updating password
    mutate({ oldPassword, newPassword });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Password
      </h2>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="p-2 border border-gray-300 rounded mt-1"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Update Password"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
