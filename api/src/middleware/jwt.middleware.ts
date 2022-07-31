// import jwt from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";

// const CheckJWT = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Token not provided!",
//       });
//     }
//     const userData = jwt.verify(token, process.env.JWT_TOKEN_USER || "");
//     res.locals.uid = userData._id;
//     next();
//   } catch (err) {
//     console.log("ERROR");
//     console.log(err);
//     return res.status(400).json({
//       success: false,
//       message: "Token expired!",
//     });
//   }
// };

// export default CheckJWT;
