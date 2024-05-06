import { AiOutlineClose } from 'react-icons/ai';
import { FaBookOpen, FaUser, FaRupeeSign } from "react-icons/fa";

const BookModal = ({ book, onClose }) => {
  return (
    <div className='fixed bg-black text-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose} >

      <div onClick={(event) => event.stopPropagation()} className='w-[500px] max-w-full max-h-full bg-white rounded-xl p-4 flex flex-col relative' >
        <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
        {/* <h4 className='my-2 text-gray-500'>{book._id}</h4> */}
        <b className='w-fit px-4 py-1 bg-red-600 rounded-lg mb-4 text-white'>{book.publishYear} </b>

        <div className='flex justify-start items-center gap-x-2'>
          <FaBookOpen className='text-purple-600 text-2xl' />
          <b className='my-1'>{book.title}</b>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaUser className='text-purple-600 text-2xl' />
          <b className='my-1'>{book.author}</b>
        </div>
        <div className='flex justify-start items-center gap-x-2 mb-2'>
          <FaRupeeSign className='text-purple-600 text-2xl' />
          <b className='my-1'>{book.cost} ₹</b>
        </div>
        <div className='flex justify-start items-center gap-x-2 mb-4 text-center'>
          <b className=''>{book.description}</b>
        </div>
      </div>

    </div>
  );
};

export default BookModal;
