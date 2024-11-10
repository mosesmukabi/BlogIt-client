import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import apiBase from "../../utils/apiBase"; // Ensure apiBase points to your server

const BlogListing = () => {
  // Fetching blogs from the backend using react-query
  const {
    isLoading,
    isError,
    error,
    data: blogs,
  } = useQuery("fetchBlogs", async () => {
    const response = await fetch(`${apiBase}/blogs`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch blogs");
    }

    const blogsData = await response.json();
    return blogsData;
  });

  if (isLoading) {
    return <h2 className="text-center text-3xl mt-5">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="text-center text-3xl mt-5">{error.message}</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <img
              src={blog.featuredImage || "https://via.placeholder.com/150"}
              alt="Featured"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex items-center mt-4">
              <img
                src={blog.user.avatar || "https://via.placeholder.com/40"}
                alt="Author"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-500 text-sm">
                  By {blog.user.firstName} {blog.user.lastName}{" "}
                </p>
                <p className="text-gray-500 text-sm">
                  Posted on {new Date(blog.createdAt).toDateString()}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
