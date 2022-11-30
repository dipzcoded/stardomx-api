import asyncHandler from "express-async-handler";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = req?.user;
  delete currentUser?.password;
  return res.json({
    currentUser,
  });
});
