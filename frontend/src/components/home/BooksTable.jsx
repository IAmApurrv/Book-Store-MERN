import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { BiShow } from 'react-icons/bi';

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const handleModalOpen = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr className='h-8 bg-cyan-900 text-white'>
            <th className='border border-slate-600 rounded-md font-bold'>No</th>
            <th className='border border-slate-600 rounded-md font-bold'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden font-bold'>Author</th>
            <th className='border border-slate-600 rounded-md font-bold'>Cost</th>
            <th className='border border-slate-600 rounded-md max-md:hidden font-bold'>Publish Year</th>
            <th className='border border-slate-600 rounded-md font-bold'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='h-8 bg-cyan-300'>
              <td className='border border-slate-700 rounded-md text-center font-bold'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center font-bold'>{book.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden font-bold'>{book.author}</td>
              <td className='border border-slate-700 rounded-md text-center font-bold'>{book.cost} ₹</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden font-bold'>{book.publishYear}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <BiShow className='text-2xl text-blue-600 hover:text-blue-900 cursor-pointer' onClick={() => handleModalOpen(book)} />
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-600 hover:text-green-900' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-900' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-900' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <BookModal book={selectedBook} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BooksTable;
