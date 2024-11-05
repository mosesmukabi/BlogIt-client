import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiBase from '../../utils/apiBase';
import Input from '../../utils/Input';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (blog) => {
      const response = await fetch(`${apiBase}/blogs`, {
        method: 'POST',
        body: JSON.stringify(blog),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      navigate(`/blog/${data.id}`);
      toast.success('Blog created successfully', {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const handleImageUpload = (url) => {
    setFeaturedImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !excerpt || !body || !featuredImage) {
        toast.error('Please fill in all required fields.');
        return;
    }

    console.log("Featured Image URL:", featuredImage); // Check if URL is valid here

    const blog = {
        title,
        excerpt,
        body,
        featuredImage,
    };

    mutate(blog);
};

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Featured Image (required)</label>
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
          <p className="text-gray-500 text-sm">Character count: {title.length}</p>
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
          <p className="text-gray-500 text-sm">Character count: {excerpt.length}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Body</label>
          <Editor
            style={{ height: '320px' }}
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-slate-400"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'post blog'}
        </button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default WritePage;
