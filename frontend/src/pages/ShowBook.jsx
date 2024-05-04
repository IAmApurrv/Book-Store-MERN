import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8 font-bold text-blue-900 text-center'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-cyan-900 text-white flex flex-col justify-center rounded-xl w-fit p-4 mx-auto'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id -</span>
            <b>{book._id}</b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title -</span>
            <b>{book.title}</b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author -</span>
            <b>{book.author}</b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Cost -</span>
            <b>{book.cost} <span className="inline-block align-middle"><FaRupeeSign /></span></b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year -</span>
            <b>{book.publishYear}</b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time -</span>
            <b>{new Date(book.createdAt).toString()}</b>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time -</span>
            <b>{new Date(book.updatedAt).toString()}</b>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
