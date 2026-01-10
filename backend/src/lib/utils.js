import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
// Generate JWT Token
const {JWT_SECRET} = process.env;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}


const token = jwt.sign({userId: userId}, JWT_SECRET, {
    expiresIn: '7d',
})

res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV === 'development' ? false : true, //set to true in production
    sameSite: 'strict', //CSRF protection  

});
return token;
}
