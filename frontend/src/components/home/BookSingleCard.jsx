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

  return (
    <div className='bg-cyan-900 text-white rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h4 className='my-2 text-gray-500 mb-6'>{book._id}</h4>
      <b className='absolute top-1 right-2 px-4 py-1 bg-red-600 rounded-lg'>{book.publishYear}</b>

      <div className='flex justify-start items-center gap-x-2'>
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
      </div>

      <div className='flex justify-between items-center gap-x-2 mt-2 p-4'>
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
