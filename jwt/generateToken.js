import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (user, faceId, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

  const token = jwt.sign(
    { id: user._id, faceId },
    process.env.JWT_TOKEN,
    { expiresIn: '14d' }
  );

  res.cookie('jwt', token, {
    httpOnly: false,                             
    secure: isProduction,                       
    sameSite: isProduction ? 'None' : 'Lax',   
    maxAge: 14 * 24 * 60 * 60 * 1000          
  });

  console.log('JWT created and cookie set');
};

export { createTokenAndSaveCookie };
