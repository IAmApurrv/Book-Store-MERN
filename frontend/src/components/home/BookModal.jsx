import { AiOutlineClose } from 'react-icons/ai';
import { FaBookOpen, FaUser, FaRupeeSign } from "react-icons/fa";

const BookModal = ({ book, onClose }) => {

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
    <div className='fixed bg-black text-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose} >

      <div onClick={(event) => event.stopPropagation()} className='w-[900px] max-w-full max-h-full bg-white rounded-xl p-4 flex flex-col relative' >
        <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
        {/* <h4 className='my-2 text-gray-500'>{book._id}</h4> */}

        <b className='w-fit px-4 py-2 mb-2 bg-red-600 rounded-lg text-white'>{formatDate(book.publishDate)}</b>

        <div className='flex justify-center items-center gap-x-2'>
          <FaBookOpen className='text-cyan-900 text-3xl' />
          <b className='my-1 text-3xl font-extrabold text-cyan-900 uppercase tracking-wider'>{book.title}</b>
        </div>


        <div className='py-4 gap-x-2 flex justify-center'>
          <div className='px-4 flex justify-start items-center'>
            <FaUser className='text-purple-600 text-2xl' />
            <b className='my-1'>{book.author}</b>
          </div>
          <div className='px-4 flex justify-start items-center'>
            <FaRupeeSign className='text-purple-600 text-2xl' />
            <b className='my-1'>{book.cost} ₹</b>
          </div>
        </div>

        <div className='flex justify-start items-center gap-x-2 mb-4'>
          <b className='' style={{ whiteSpace: 'pre-wrap' }}>{book.description}</b>
        </div>
      </div>

    </div>
  );
};

export default BookModal;
