import React from 'react';
import { Link } from 'react-router-dom';

const BlogListing = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Beauty of the JavaScript Ecosystem',
      excerpt: 'Discover the vibrant and versatile JavaScript ecosystem...',
      featuredImage: 'https://via.placeholder.com/150',
      author: { name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
      date: 'Oct 28, 2024',
    },
    {
      id: 2,
      title: 'Why React is Taking Over Frontend Development',
      excerpt: 'Explore the key reasons why React has become so popular...',
      featuredImage: 'https://via.placeholder.com/150',
      author: { name: 'Jane Smith', avatar: '' },
      date: 'Oct 29, 2024',
    },
    {
      id: 3,
      title: 'Understanding Async and Await in JavaScript',
      excerpt: 'Async and await make JavaScript asynchronous programming...',
      featuredImage: 'https://via.placeholder.com/150',
      author: { name: 'Alice Johnson', avatar: 'https://via.placeholder.com/40' },
      date: 'Oct 30, 2024',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <img src={blog.featuredImage} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
            <div className="flex items-center mt-4">
              <img
                src={blog.author.avatar || 'https://via.placeholder.com/40'}
                alt="Author"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-500 text-sm">By {blog.author.name} • {blog.date}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">{blog.excerpt}</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline mt-4 inline-block">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
