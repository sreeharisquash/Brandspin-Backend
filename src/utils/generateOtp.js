// Generate random OTP
export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};