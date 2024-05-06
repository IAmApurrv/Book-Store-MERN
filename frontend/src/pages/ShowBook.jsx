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

  // const formatDate = (dateString) => {
  //   const dateObject = new Date(dateString);
  //   const dayAndDate = dateObject.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  //   return `${dayAndDate}`;
  // };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.toLocaleDateString(undefined, { weekday: 'long' });
    const dayOfMonth = dateObject.toLocaleDateString(undefined, { day: 'numeric' });
    const month = dateObject.toLocaleDateString(undefined, { month: 'long' });
    const year = dateObject.toLocaleDateString(undefined, { year: 'numeric' });

    return `${day}, ${dayOfMonth} ${month} ${year}`;
  };


  const formatDate2 = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };

    const dateObject = new Date(dateString);
    const time = dateObject.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const dayAndDate = dateObject.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

    return `${time}, ${dayAndDate}`;
  };

  return (
    <div className='p-4'>
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className='my-4 flex'>
          <div className='w-1/3 h-full flex justify-center rounded-xl bg-cover' style={{ backgroundImage: "url()" }}>
            <img className='w-3/4 h-2/3 rounded-xl' src={book.imageURL} alt={book.title} />
          </div>

          <div className='w-2/3 h-full mx-4 pt-6 p-8 bg-cyan-900 text-white flex flex-col rounded-xl'>
            <div>
              <h1 className='text-3xl mt-2 mb-2 font-bold text-center'>{book.title}</h1>
              <div className='pb-4'>
                <span className='text-xl mr-4 text-gray-300'>Author :</span>
                <b>{book.author}</b>
              </div>
            </div>

            <div className='py-6'>
              <i style={{ whiteSpace: 'pre-wrap' }}>{book.description}</i>
            </div>

            <div className='my-4'>
              <table>
                <tr>
                  <td className='text-xl text-gray-300'>Cost</td>
                  <td>: &nbsp;&nbsp;&nbsp;<b>{book.cost} ₹</b></td>
                </tr>
                <tr>
                  <td className='text-xl text-gray-300'>Publish Date &nbsp;</td>
                  <td>: &nbsp;&nbsp;&nbsp;<b>{formatDate(book.publishDate)}</b></td>
                </tr>
              </table>
            </div>

            <div className='mt-8'>
              <table>
                <tr>
                  <td className='text-gray-300'>Book added at &nbsp;</td>
                  <td>: &nbsp;&nbsp;<b>{formatDate2(book.createdAt)}</b></td>
                </tr>
                <tr>
                  <td className='text-gray-300'>Last update at &nbsp;</td>
                  <td>: &nbsp;&nbsp;<b>{formatDate2(book.updatedAt)}</b></td>
                </tr>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
