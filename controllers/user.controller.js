import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import User from "../models/user.model.js";

function euclideanDistance(arr1, arr2) {
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += (arr1[i] - arr2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

const FACE_MATCH_THRESHOLD = 0.6;

const signupOrLogin = async (req, res) => {
  try {
    let { faceId } = req.body;

    if (!faceId) {
      return res.status(400).json({ message: "faceId is required" });
    }

    if (typeof faceId === 'string') {
      faceId = JSON.parse(faceId);
    }

    const users = await User.find();

    let matchedUser = null;

    for (const user of users) {
      const stored = JSON.parse(user.faceId);
      const distance = euclideanDistance(stored, faceId);

      if (distance < FACE_MATCH_THRESHOLD) {
        matchedUser = user;
        break;
      }
    }

    if (matchedUser) {
      createTokenAndSaveCookie(matchedUser._id, faceId, res);
      return res.status(200).json({ message: "Login successful", user: matchedUser });
    }

    const newUser = new User({ faceId: JSON.stringify(faceId) });
    await newUser.save();

    createTokenAndSaveCookie(newUser._id, faceId, res);
    res.status(201).json({ message: "Signup successful", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Face authentication failed", error: error.message });
  }
};



export { signupOrLogin };
