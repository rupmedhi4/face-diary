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

    // ✅ Validate incoming faceId
    if (!faceId || !Array.isArray(faceId) || faceId.length < 50) {
      return res.status(400).json({ message: "Invalid faceId format" });
    }

    const users = await User.find();
    let matchedUser = null;

    for (const user of users) {
      let storedFaceId = user.faceId;

      // ✅ Parse if stored as string
      if (typeof storedFaceId === "string") {
        storedFaceId = JSON.parse(storedFaceId);
      }

      if (!Array.isArray(storedFaceId)) continue;

      const distance = euclideanDistance(storedFaceId, faceId);
      if (distance < FACE_MATCH_THRESHOLD) {
        matchedUser = user;
        break;
      }
    }

    let user;
    if (matchedUser) {
      user = matchedUser;
    } else {
      user = new User({ faceId: JSON.stringify(faceId) }); // ✅ Store consistently
      await user.save();
    }

    const token = createTokenAndSaveCookie(user._id, res);

    return res.status(matchedUser ? 200 : 201).json({
      message: matchedUser ? "Login successful" : "Signup successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Face authentication failed",
      error: error.message,
    });
  }
};

export { signupOrLogin };
