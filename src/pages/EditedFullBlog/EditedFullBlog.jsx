import React from 'react';
import { useParams } from 'react-router-dom';
import apiBase from '../../utils/apiBase';
import { useQuery } from 'react-query';

function EditedFullBlog() {
  const { id: blogId } = useParams(); // Capture blog ID from URL
  console.log("Blog ID from params:", blogId); // Debugging log to ensure we have the blog ID

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log("Fetched blog data:", data); // Debugging log
      return data;
    },
    enabled: !!blogId, // Only run query if blogId is defined
  });

  if (isLoading) {
    return <h2 className="text-center text-3xl mt-5">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="text-center text-3xl mt-5">{error.message}</h2>;
  }

  return (
    <div className="full-blog flex flex-col items-center bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
      {data.featuredImage ? (
        <img
          src={data.featuredImage}
          alt="Featured blog"
          className="w-48 h-48 object-cover rounded-lg shadow-md mb-6"
        />
      ) : (
        <p>No featured image available</p>
      )}
      <div className="text-center mb-5">
        <p>Last updated: {data.updatedAt ? new Date(data.updatedAt).toDateString() : "Date unavailable"}</p>
        <p>By {data.user?.firstName || "Unknown"} {data.user?.lastName || "Author"}</p>
      </div>
      <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-4 text-center">
        {data.title || "Title not available"}
      </h2>
      <p className="text-2xl text-gray-600 mb-4 italic text-center">
        {data.excerpt || "No excerpt available"}
      </p>
      <div
        className="prose lg:prose-2xl text-gray-700 leading-relaxed mt-4 text-center"
        dangerouslySetInnerHTML={{ __html: data.body || "<p>No content available</p>" }}
      />
    </div>
  );
}

export default EditedFullBlog;
