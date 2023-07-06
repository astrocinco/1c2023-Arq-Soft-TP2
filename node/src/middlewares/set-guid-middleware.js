import { guid } from "../utils/guid.js";

const HANDLE_GUID_ERRORS_HEADER = "X-Handle-Guid-Errors";

export const setGuidMiddleware = (guidHost, actionName) => {
  return async (request, response, next) => {
    let id;
    try {
      id = await getGuid(guidHost, request);
    } catch (err) {
      response.status(500).send(err.message);
      return;
    }
    const oldSend = response.send;
    response.send = function () {
      const body = arguments[0];
      arguments[0] = JSON.stringify({ id, [actionName]: body });
      oldSend.apply(response, arguments);
    };
    next();
  };
};

const getGuid = (guidHost, request) => {
  const handleErrors = request.get(HANDLE_GUID_ERRORS_HEADER) === "true";

  if (handleErrors) {
    return guid.get(guidHost);
  }

  return guid.getRemoteGuid(guidHost);
};
