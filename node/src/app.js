import config from "./config.js";
import express from "express";
import { nanoid } from "nanoid";
import { controller } from "./utils/controller-wrapper.js";
import { appRouter, limitedRouter } from "./routers/index.js";
import { middleware } from "./middlewares/index.js";

const PORT = 3000;

const id = nanoid();
const app = express();

// Set app to user X-API-Id header
app.use((req, res, next) => {
  res.setHeader("X-API-Id", id);
  next();
});

// From TP2
app.get(
  "/",
  middleware.guid(config.remoteGuidsUri, "hello-world"),
  controller((req, res, next) => res.send("Hello World!"))
);
app.get(
  "/test",
  middleware.guid(config.remoteGuidsUri, "test"),
  controller(wrapped(getTestValue))
);

// From TP1
app.use("/", appRouter);
app.use("/limited", limitedRouter);

// Start app
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

// TODO: Delete this when the setup is done
// --- Test Request handlers ---

function wrapped(handler) {
  return async (req, res) => {
    try {
      const response = await handler();
      res
        .status(200)
        .set({ "Cache-Control": "no-cache, no-store, must-revalidate" })
        .send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

async function getTestValue() {
  return "This is a test";
}

// --- helper functions ---

function debug(...args) {
  if (!config.debug) {
    return;
  }

  console.log(...args);
}
