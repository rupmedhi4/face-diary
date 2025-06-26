import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  text: [
    {
      content: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    }
  ],
});

const Diary = mongoose.model("Diary", diarySchema);

export default Diary;
