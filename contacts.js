const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// --------------- List Contacts ---------------
async function listContacts() {
  try {
    const contacts = await readFile(contactsPath);
    return contacts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// --------------- Get Contact By Id ---------------
async function getContactById(contactId) {
  try {
    const contacts = await readFile(contactsPath);
    const foundContact = contacts.find((contact) => contact.id === contactId.toString());
    return foundContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// --------------- Remove Contact ---------------
async function removeContact(contactId) {
  try {
    const contacts = await readFile(contactsPath);
    const index = contacts.findIndex((contact) => contact.id === contactId.toString());
    if (index < 0) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// --------------- Add Contact ---------------
async function addContact({ name, email, phone }) {
  try {
    const contacts = await readFile(contactsPath);
    const id = randomUUID();
    const newContact = { id, name, email, phone };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// --------------- Read File ---------------
async function readFile(path) {
  const data = await fs.readFile(path, "utf8");
  return JSON.parse(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
