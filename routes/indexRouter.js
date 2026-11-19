const { Router } = require("express");
const {
  getMessages,
  getNewForm,
  postNewMessage,
  getMessageDetail,
  validateMessage,
} = require("../controllers/messagesController");

const indexRouter = Router();

indexRouter.get("/", getMessages);

indexRouter.get("/new", getNewForm);

indexRouter.post("/new", validateMessage, postNewMessage);

indexRouter.get("/message/:id", getMessageDetail);

module.exports = indexRouter;
