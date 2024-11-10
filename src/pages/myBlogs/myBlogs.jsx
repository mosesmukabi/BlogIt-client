import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiBase from "../../utils/apiBase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBlogs = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch only the blogs created by the logged-in user
  const {
    isLoading,
    isError,
    error,
    data: blogs,
  } = useQuery("fetchUserBlogs", async () => {
    const response = await fetch(`${apiBase}/blogs/user`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const blogsData = await response.json();
    return blogsData;
  });

  // Mutation for deleting a blog
  const deleteMutation = useMutation(
    async (blogId) => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Blog deleted successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        queryClient.invalidateQueries("fetchUserBlogs");
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      },
    },
  );

  const handleDelete = (blogId) => {
    deleteMutation.mutate(blogId);
  };

  const handleUpdate = (blogId) => {
    navigate(`/editBlog/${blogId}`); // Adjusted to match the new route
  };

  if (isLoading) {
    return <h2 className="text-center text-3xl mt-5">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="text-center text-3xl mt-5">{error.message}</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {blogs.length === 0 ? (
          <h2 className="text-center text-2xl mt-5 text-gray-600">
            You haven't created any blogs yet.{" "}
            <Link to="/write" className="text-blue-500 hover:underline">
              Write Now
            </Link>
          </h2>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg p-4 mb-6"
            >
              <img
                src={blog.featuredImage}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center mt-4">
                <img
                  src={blog.user?.avatar || "https://via.placeholder.com/40"}
                  alt="Author"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Created on {new Date(blog.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">{blog.excerpt}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Read More
              </Link>

              {/* Update and Delete buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdate(blog.id)}
                  className="bg-blue-200 text-blue-700 py-1 px-4 rounded w-full mr-2 hover:bg-blue-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className={`bg-blue-200 text-blue-700 py-1 px-4 rounded w-full ml-2 hover:bg-blue-300 ${
                    deleteMutation.isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBlogs;
