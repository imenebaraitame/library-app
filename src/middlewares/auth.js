import jwt from 'jsonwebtoken';

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Auth Token:", token);
    if (token == null) return res.sendStatus(401);  
    jwt.verify(token, process.env.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next(); 
    });
}
export default authenticationToken;