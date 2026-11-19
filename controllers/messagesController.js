const db = require("../db/queries");

async function getMessages(req, res) {
  let messages = await db.getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

function getNewForm(req, res) {
  res.render("form");
}

async function postNewMessage(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).render("form", {
      errors: errors.array(),
      messageUser: req.body.messageUser,
      messageText: req.body.messageText,
    });
  }

  const { messageText, messageUser } = req.body;
  await db.insertMessage(messageText, messageUser);
  res.redirect("/");
}

async function getMessageDetail(req, res, next) {
  const messageId = req.params.id;
  const selectedMessage = await db.getMessage(messageId);

  if (!selectedMessage) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.render("detail", {
    title: `${selectedMessage.username}'s message`,
    message: selectedMessage,
  });
}

module.exports = {
  getMessages,
  getNewForm,
  postNewMessage,
  getMessageDetail,
};
