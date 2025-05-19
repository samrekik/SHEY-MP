const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
try {
    const token=req.header("Authorization")?.split(" ")[1]
    if (!token) {
        return res.status(401).send({ success: false, error: "No token provided" });
      }
    const decryptedToken=jwt.verify(token,process.env.SECRET_KEY)
    req.userId=decryptedToken.userId
    next()
} catch (error) {
    res.send({ success: false, error: error.message });
}
}