import express from "express";
import config from "../config.js";
import { middleware } from "../middlewares/index.js";
import { controller } from "../controllers/index.js";
import { metricsControllerWrapper } from "../utils/metrics.js";

const appRouter = express.Router();

appRouter.get("/ping", metricsControllerWrapper("ping", controller.pingPong));

appRouter.get(
  "/metar",
  middleware.guid(config.remoteGuidsUri, "metar"),
  metricsControllerWrapper("metar", controller.metar)
);

appRouter.get(
  "/space_news",
  middleware.guid(config.remoteGuidsUri, "space-news"),
  metricsControllerWrapper("space-news", controller.spaceNews)
);

appRouter.get(
  "/fact",
  middleware.guid(config.remoteGuidsUri, "fact"),
  metricsControllerWrapper("fact", controller.fact)
);

export { appRouter };
