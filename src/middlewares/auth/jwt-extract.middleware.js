import asyncHandler from "express-async-handler";
import jsonwebtoken from "jsonwebtoken";
import { prismaInstance } from "../../prisma/index.js";
export const jwtExtractMiddleware = asyncHandler(async (req, res, next) => {
  const userModel = prismaInstance.user;
  let token;

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(403);
    throw new Error("token not passed to the request header");
  }

  if (!token) {
    res.status(403);
    throw new Error("token not passed");
  } else {
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findUnique({
      where: {
        email: decodedToken.email,
      },
    });

    next();
  }
});
