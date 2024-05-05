import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/books')
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
        <button className={`type-btn ${showType === 'table' ? 'bg-cyan-900 text-white' : 'bg-cyan-300 text-gray-800'} px-4 py-2 rounded-lg`} onClick={() => setShowType('table')}><b>Table</b></button>
        <button className={`type-btn ${showType === 'card' ? 'bg-cyan-900 text-white' : 'bg-cyan-300 text-gray-800'} px-4 py-2 rounded-lg`} onClick={() => setShowType('card')}><b>Card</b></button>
      </div>

      <div className='flex justify-end items-center'>
        {/* <h1 className='text-3xl my-8 font-bold text-blue-900'>Books List</h1> */}

        {/* <Link to='/books/create'>
          <MdOutlineAddBox className='text-cyan-800 text-4xl' />
        </Link> */}
        {/* <Link to='/books/create' className='hover:bg-cyan-300 px-1 py-1 mr-4 rounded-lg'>
          <div className="flex items-center justify-center rounded-lg p-4">
            <h1 className="text-center text-lg font-bold text-blue-900">Add a new Book</h1>
            <IoMdAddCircle className='text-3xl ml-2' />
          </div>
        </Link> */}
        <Link to='/books/create' className='px-1 py-1 mr-2 rounded-lg hover:bg-cyan-900 hover:text-white'>
          <div className="flex items-center text-center rounded-lg py-2">
            <div className="w-3/4">
              <h1 className="text-lg font-bold">
                Add a new Book
              </h1>
            </div>
            <div className="w-1/4 flex">
              <IoMdAddCircle className='text-3xl' />
            </div>
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
