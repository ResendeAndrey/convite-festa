export const authConfig = {
  secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "fallback_secret"
};

export default authConfig;
