export const getErrorMessage = (error: unknown) => {
  const err = error as Error;
  return { status: 400, message: err.message };
};
