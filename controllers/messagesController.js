const messages = require("../data/messages");

function getMessages(req, res) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

function getNewForm(req, res) {
  res.render("form");
}

function postNewMessage(req, res) {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
}

function getMessageDetail(req, res, next) {
  const messageId = req.params.id;
  const selectedMessage = messages[messageId];

  if (!selectedMessage) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.render("detail", {
    title: `${selectedMessage.user}'s message`,
    message: selectedMessage,
  });
}

module.exports = { getMessages, getNewForm, postNewMessage, getMessageDetail };
