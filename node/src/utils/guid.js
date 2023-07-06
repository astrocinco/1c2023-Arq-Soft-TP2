import * as uuid from "uuid";
import axios from "axios";
import { metricsFnWrapper } from "./metrics.js";

let serviceAvailableAfterTime = 0;

const getGuid = async (guidHost) => {
  if (serviceAvailableAfterTime > Date.now()) {
    return getLocalGuid();
  }

  try {
    return await getRemoteGuid(guidHost);
  } catch (err) {
    console.log(
      `No se pudo obtener GUID de ${guidHost}. Se genera GUID local.`
    );
    return getLocalGuid();
  }
};

const getLocalGuid = () => uuid.v4();

const getRemoteGuid = (guidHost) =>
  metricsFnWrapper("guid-provider", () => axios.get(guidHost))
    .then((res) => res.data)
    .catch((err) => {
      handle429TooManyRequestError(err);
      throw err;
    });

const handle429TooManyRequestError = (err) => {
  if (err.response?.status != 429) return;

  const retryAfterValue = err.response.headers["retry-after"];
  const retryAfterTime = Number(retryAfterValue) * 1000;
  serviceAvailableAfterTime = Date.now() + retryAfterTime;
};

export const guid = {
  get: getGuid,
  getRemoteGuid,
};
