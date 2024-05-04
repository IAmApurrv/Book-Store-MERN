import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cost, setCost] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      cost,
      publishYear
    };
    setLoading(true);
    axios
      .post('http://localhost:3000/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-8 font-bold text-blue-900 text-center'>Add Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='bg-cyan-900 flex flex-col rounded-xl w-[600px] p-4 mx-auto'>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Cost</label>
          <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300 font-bold'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='px-4 py-2 w-full' />
        </div>

        <button className='p-2 bg-cyan-300 mt-8 font-bold text-blue-900' onClick={handleSaveBook}>Add</button>

      </div>

    </div>
  );
}

export default AddBook