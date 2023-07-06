export const controller = (controllerFn) => {
  return async (request, response, next) => {
    try {
      await controllerFn(request, response, next);
      next();
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Ocurrió un error");
    }
  };
};
