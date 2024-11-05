import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiBase from '../../utils/apiBase';
import { useQuery } from 'react-query';

// const FullBlog = () => {
//   const { id } = useParams(); // Get the ID from the URL
//   const [postId, setPostId] = useState(null); // State to hold the post ID
//   const [error, setError] = useState(null); // State for any potential error

//   useEffect(() => {
//     // Simulate fetching the ID from an API by directly setting it in the state
//     if (id) {
//       setPostId(id); // Set the ID in the state
//     } else {
//       setError('Failed to retrieve blog post ID.');
//     }
//   }, [id]);

//   return (
//     <div className="full-blog">
//       {error ? ( // Display an error message if there was an issue
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <p>Your blog post ID is {postId}</p> // Display the ID
//       )}
//     </div>
//   );
// };
function FullBlog() {
  const { id } = useParams(); // Get the ID from the URL
  const {isLoading, isError, error, data} =useQuery({
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message); 
      }
      const data = await response.json();
      console.log(data);
      return data;
    }
  })
  if (isLoading){
    return(
      <h2 className="text-center text-3xl mt-5">Loading...</h2>
  )
  
  }
  if (isError){
    return(
      <h2 className="text-center text-3xl mt-5">{error.message}</h2>
  )
  
  }

  return (
    <div className="full-blog flex flex-col items-center bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
  <img 
    src={data.featuredImage} 
    alt="Featured blog" 
    className="w-48 h-48 object-cover rounded-lg shadow-md mb-6" 
  />
  <div className="text-center mb-5">
  <p>Last updated: {new Date(data.updatedAt).toDateString() }</p>
  <p >By {data.user.firstName } {data.user.lastName}</p>
  </div>
  <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-4 text-center">
    {data.title}
  </h2>
  <p className="text-2xl text-gray-600 mb-4 italic text-center">
    {data.excerpt}
  </p>
  <div 
  className="prose lg:prose-2xl text-gray-700 leading-relaxed mt-4 text-center"
  dangerouslySetInnerHTML={{ __html: data.body }} 
/>

</div>

  

  );
}

export default FullBlog;
