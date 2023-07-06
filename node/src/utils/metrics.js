import tracer from "dd-trace";
import config from "../config.js";

tracer.init(config.datadog);

export const metricsFnWrapper = async (name, fn) => {
  const response = await tracer.trace(name, (span) => fn());
  console.log(`Metrica ${name} enviada a Datadog`);
  return response;
};

export const metricsControllerWrapper = (name, controller) => {
  return async (...args) => {
    const response = await tracer.trace(name, (span) => controller(...args));
    console.log(`Metrica ${name} enviada a Datadog`);
    return response;
  };
};
