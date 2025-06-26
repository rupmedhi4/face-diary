import Diary from "../models/diary.entries.model.js";


const diaryEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, text } = req.body;

    if (!date || !text) {
      return res.status(400).json({ message: 'Date and text are required' });
    }

    let diary = await Diary.findOne({ userId });
    const entry = { content: text, date };

    if (diary) {
      diary.text.unshift(entry);
      await diary.save();
    } else {
      diary = new Diary({
        userId,
        text: [entry]
      });
      await diary.save();
    }

    res.status(201).json({ message: "Diary entry saved", entry, entries: diary.text });
  } catch (error) {
    console.error("Diary Save Error:", error);
    res.status(500).json({ message: "Failed to save diary entry" });
  }
};


const getDiaryEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDiary = await Diary.findOne({ userId });

    res.status(200).json({
      message: "Fetched diary entries successfully",
      entries: userDiary?.text || [],
    });
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    res.status(500).json({ message: "Failed to fetch diary entries" });
  }
};




export { diaryEntries, getDiaryEntries };
