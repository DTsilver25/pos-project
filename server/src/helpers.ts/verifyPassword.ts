import bcrypt from "bcrypt";

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isCorrect = await bcrypt.compare(password, hash);
  return isCorrect;
};
