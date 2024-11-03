import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme for PrimeReact
import 'primereact/resources/primereact.min.css';          // Core CSS for PrimeReact
import 'primeicons/primeicons.css';                        // PrimeIcons
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiBase from '../../utils/apiBase';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const navigate = useNavigate();

 const { mutate, isLoading } = useMutation({
    mutationFn: async (blog) => {
    const response = await  fetch(`${apiBase}/blogs`, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
    },

    onSuccess: (data) => {
      navigate(`/feeds/${data.id}`);
      toast.success('Blog created successfully',{
        duration: 3000
      });
    },

    onError: (error) => {
      toast.error(error.message,{
        duration: 3000
      });
      

    },
  });
  const handleImageUpload = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !excerpt || !body || !featuredImage) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const blogs = {
      title,
      excerpt,
      body
    }

    mutate(blogs); 
    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('excerpt', excerpt);
    // formData.append('body', body);
    // formData.append('featuredImage', featuredImage);

    // // Make the API request to submit the form
    // try {
    //   const response = await fetch('/api/posts', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (!response.ok) throw new Error('Failed to submit post');

    //   toast.success('Post created successfully!');
    //   navigate('/feeds');
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Featured Image (required)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Title (required)</label>
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
          <label className="block font-medium">Excerpt (required)</label>
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
          <label className="block font-medium">Body (required)</label>
          <Editor
            style={{ height: '320px' }}
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-slate-400"
        onClick={handleSubmit}
        disabled={isLoading}
        >
          {
          isLoading ? 'Submitting...' : 'Submit'
          }
        </button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default WritePage;

