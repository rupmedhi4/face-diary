import jwt from 'jsonwebtoken'


const createTokenAndSaveCookie = (user, faceId, res) => {
    const token = jwt.sign(
        { id: user._id, faceId },
        process.env.JWT_TOKEN,
        {
            expiresIn: '14d'
        })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // ✅ true for https, false for dev/local
        sameSite: 'None', // ✅ for cross-site cookie
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });
 
    console.log(token);

}

export { createTokenAndSaveCookie }
