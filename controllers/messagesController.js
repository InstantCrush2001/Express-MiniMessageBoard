const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// validación de ambos campos Usuario y Mensaje
const validateMessage = [
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ max: 255 })
    .withMessage("El nombre no puede pasar de 255 caracteres."),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage("El mensaje es obligatorio.")
    .isLength({ max: 255 })
    .withMessage("El mensaje no puede pasar de 255 caracteres."),
];

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
    return res.status(400).render("form", {
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
  validateMessage,
  getMessages,
  getNewForm,
  postNewMessage,
  getMessageDetail,
};
