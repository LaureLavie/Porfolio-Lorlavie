const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { sendContactMail } = require("../controllers/contactController");

//GET - récupérer le contact
router.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
});
//POST - créer et modifier le contact
router.post("/", async (req, res) => {
  const existingContact = await Contact.findOne();
  if (existingContact) {
    await Contact.findByIdAndUpdate(existingContact._id, req.body);
    res.json({
      message: "Contact mis à jour",
    });
  } else {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({
      message: "Contact crée",
    });
  }
});

// Nouvelle route pour envoyer un mail de contact
router.post("/send", sendContactMail);

module.exports = router;
