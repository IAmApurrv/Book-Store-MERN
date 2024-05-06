import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Return an empty string if dateString is not provided

    const dateObject = new Date(dateString);

    // Format the date in yyyy-MM-dd format
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-indexed
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        // const { title, author, publishDate, imageURL, description, cost } = response.data;
        setTitle(response.data.title);
        setAuthor(response.data.author);
        // setPublishDate(response.data.publishDate);
        setPublishDate(formatDate(response.data.publishDate));
        setImageURL(response.data.imageURL);
        setDescription(response.data.description);
        setCost(response.data.cost);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishDate,
      imageURL,
      description,
      cost
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        console.log(`Book updated - ` + data.title);
        navigate(`/books/details/${id}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl mb-4 font-bold text-blue-900 text-center'>Update Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='bg-cyan-900 flex flex-col rounded-xl w-[900px] p-4 mx-auto'>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Publish Date</label>
          <input type='date' value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Image URL</label>
          <input type='text' value={imageURL} onChange={(e) => setImageURL(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Description</label>
          {/* <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='px-4 py-2 w-full' /> */}
          <textarea value={description} rows={5} onChange={(e) => setDescription(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Cost</label>
          <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <button className='p-2 bg-cyan-300 mt-4 font-bold text-blue-900 hover:bg-cyan-600 hover:text-white' onClick={handleEditBook}>Update</button>

      </div>

    </div>
  )
}

export default EditBook
