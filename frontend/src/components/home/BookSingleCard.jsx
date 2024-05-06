import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { FaBookOpen, FaUser, FaRupeeSign } from "react-icons/fa";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  // const formatDate = (dateString) => {
  //   const dateObject = new Date(dateString);
  //   const dayAndDate = dateObject.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  //   return `${dayAndDate}`;
  // };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // const day = dateObject.toLocaleDateString(undefined, { weekday: 'long' });
    // const dayOfMonth = dateObject.toLocaleDateString(undefined, { day: 'numeric' });
    // const month = dateObject.toLocaleDateString(undefined, { month: 'long' });
    const year = dateObject.toLocaleDateString(undefined, { year: 'numeric' });

    return `${year}`;
  };

  return (
    <div className='bg-cyan-900 text-white rounded-lg px-2 py-2 m-2 relative hover:shadow-xl'>
      <h4 className='my-2 text-gray-500 mb-6'>{book._id}</h4>
      <b className='absolute top-1 right-2 px-4 py-1 bg-red-600 rounded-lg'>{formatDate(book.publishDate)}</b>

      <table>
        <tbody>
          <tr className='my-4 flex justify-start items-center gap-x-2'>
            <td className='flex items-center gap-x-1'>
              <FaBookOpen className='text-purple-600 text-2xl' />
              <h1>Title</h1>
            </td>
            <td>: &nbsp;&nbsp;<b>{book.title}</b></td>
          </tr>
          <tr className='my-4 flex justify-start items-center gap-x-2'>
            <td className='flex items-center gap-x-1'>
              <FaUser className='text-purple-600 text-2xl' />
              <h1>Author</h1>
            </td>
            <td>: &nbsp;&nbsp;<b>{book.author}</b></td>
          </tr>
          <tr className='my-4 flex justify-start items-center gap-x-2'>
            <td className='flex items-center gap-x-1'>
              <FaRupeeSign className='text-purple-600 text-2xl' />
              <h1>Cost</h1>
            </td>
            <td>: &nbsp;&nbsp;<b>{book.cost} ₹</b></td>
          </tr>
        </tbody>
      </table>
      {/* <div className='flex justify-start items-center gap-x-2'>
        <FaBookOpen className='text-purple-600 text-2xl' />
        <h1>Title:</h1>
        <b className='my-1'>{book.title}</b>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FaUser className='text-purple-600 text-2xl' />
        <h1>Author: </h1>
        <b className='my-1'>{book.author}</b>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FaRupeeSign className='text-purple-600 text-2xl' />
        <h1>Cost: </h1>
        <b className='my-1'>{book.cost} ₹</b>
      </div> */}

      <div className='p-3 flex justify-between items-center gap-x-2'>
        <BiShow className='text-3xl text-blue-600 hover:text-blue-300 cursor-pointer' onClick={() => setShowModal(true)} />
        <Link to={`/books/details/${book._id}`} className='text-green-600 hover:text-green-300'>
          <BsInfoCircle className='text-2xl' />
        </Link>
        <Link to={`/books/edit/${book._id}`} className='text-yellow-600 hover:text-yellow-300'>
          <AiOutlineEdit className='text-2xl' />
        </Link>
        <Link to={`/books/delete/${book._id}`} className='text-red-600 hover:text-red-300'>
          <MdOutlineDelete className='text-2xl' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
