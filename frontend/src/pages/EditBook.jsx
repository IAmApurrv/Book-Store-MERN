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
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setImageURL(response.data.imageURL);
        setDescription(response.data.description);
        setCost(response.data.cost);
        setPublishYear(response.data.publishYear);
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
      imageURL,
      description,
      cost,
      publishYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
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
          <label className='text-xl mr-4 text-gray-300 font-bold'>Image URL</label>
          <input type='text' value={imageURL} onChange={(e) => setImageURL(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Description</label>
          {/* <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='px-4 py-2 w-full' /> */}
          <textarea value={description} rows={3} onChange={(e) => setDescription(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Cost</label>
          <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <button className='p-2 bg-cyan-300 mt-4 font-bold text-blue-900 hover:bg-cyan-600 hover:text-white' onClick={handleEditBook}>Update</button>

      </div>

    </div>
  )
}

export default EditBook