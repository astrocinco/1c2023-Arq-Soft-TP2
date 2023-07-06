import { nanoid } from "nanoid";
import { controller } from "../utils/controller-wrapper.js";

const containerId = nanoid();

export const pingPongController = controller((req, res, next) => {
  console.log(`OK from container: ${containerId}`);
  res.status(200).send(`OK - ${containerId}`);
});
