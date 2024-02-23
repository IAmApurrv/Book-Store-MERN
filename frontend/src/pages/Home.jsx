import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-8'>

      <div className='flex justify-center items-center gap-x-4 mb-4'>
        <button className={`type-btn ${showType === 'table' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-gray-800'} px-4 py-2 rounded-lg`} onClick={() => setShowType('table')}>Table</button>
        <button className={`type-btn ${showType === 'card' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-gray-800'} px-4 py-2 rounded-lg`} onClick={() => setShowType('card')}>Card</button>
      </div>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl my-8 font-bold text-blue-900'>Books List</h1>

        {/* <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link> */}
        <Link to='/books/create' className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
          <div className="flex items-center justify-center rounded-lg p-4">
            <h1 className="text-center text-lg font-bold text-blue-900">Add a new Book</h1>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </div>
        </Link>

      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

    </div>
  );
};

export default Home;
