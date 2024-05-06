import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    // publishYear: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
