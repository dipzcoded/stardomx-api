import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { prismaInstance } from "../../prisma/index.js";

export const signIn = asyncHandler(async (req, res) => {
  const userModel = prismaInstance.user;
  const formData = req.body;

  const userFound = await userModel.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (!userFound) {
    res.status(403);
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcryptjs.compare(formData.password, userFound.password);
  if (!isMatch) {
    res.status(403);
    throw new Error("Invalid Credentials");
  }

  // generate jsonwebtoken
  const payload = {
    id: userFound.id,
    email: userFound.email,
  };

  const jwt = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return res.status(200).json({
    status: "success",
    token: jwt,
  });
});
