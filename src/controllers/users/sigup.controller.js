import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { prismaInstance } from "../../prisma/index.js";

export const signUp = asyncHandler(async (req, res) => {
  console.log(req);
  console.log(req.body);

  const userModel = prismaInstance.user;
  const formData = req.body;

  const userFound = await userModel.findUnique({
    where: {
      email: formData.email,
    },
  });

  // checking if user is already exist
  if (userFound) {
    res.status(403);
    throw new Error("user already exist with the provided email");
  }

  const salt = await bcryptjs.genSalt(12);

  // creating a new user
  const newUser = await userModel.create({
    data: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      country: formData.country,
      password: await bcryptjs.hash(formData.password, salt),
    },
  });

  // generate jsonwebtoken
  const payload = {
    id: newUser.id,
    email: newUser.email,
  };

  const jwt = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return res.status(200).json({
    status: "success",
    token: jwt,
  });
});
