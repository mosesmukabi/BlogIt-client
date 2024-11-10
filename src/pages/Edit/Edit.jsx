import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiBase from "../../utils/apiBase";
import Input from "../../utils/Input";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const navigate = useNavigate();
  const { id: blogId } = useParams(); // Capture blog ID from URL
  console.log("Blog ID from params:", blogId); // Debugging log

  // Fetch blog details based on blogId and populate form fields
  useQuery(
    ["updateBlog", blogId],
    async () => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setBody(data.body);
      setFeaturedImage(data.featuredImage);
      return data;
    },
    {
      enabled: !!blogId, // Only run query if blogId is defined
    },
  );

  // Mutation for updating the blog
  const { mutate, isLoading } = useMutation({
    mutationFn: async (blog) => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(blog),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Navigating to:", `/blog/edited/${blogId}`);
      navigate(`/blog/edited/${blogId}`);
      toast.success("Blog updated successfully", { autoClose: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 3000 });
    },
  });

  const handleImageUpload = (url) => {
    setFeaturedImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, excerpt, body, featuredImage };
    mutate(updatedBlog); // Trigger the mutation with updated blog data
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Featured Image</label>
          <Input onImageUpload={handleImageUpload} />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title here"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Enter excerpt here..."
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Body</label>
          <Editor
            style={{ height: "320px" }}
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-slate-400"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default EditPage;
