const { Router } = require("express");
const {
  getMessages,
  getNewForm,
  postNewMessage,
  getMessageDetail,
} = require("../controllers/messagesController");

const indexRouter = Router();

indexRouter.get("/", getMessages);

indexRouter.get("/new", getNewForm);

indexRouter.post("/new", postNewMessage);

indexRouter.get("/message/:id", getMessageDetail);

module.exports = indexRouter;
