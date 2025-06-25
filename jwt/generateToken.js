import jwt from 'jsonwebtoken'


const createTokenAndSaveCookie = (user,faceId,res) => {
    const token = jwt.sign(
        { id: user._id, faceId },
        process.env.JWT_TOKEN,
        {
            expiresIn: '14d'
        })

    res.cookie("jwt", token, {
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
        maxAge: 14 * 24 * 60 * 60 * 1000
    })
    console.log(token);
    
}

export { createTokenAndSaveCookie }
