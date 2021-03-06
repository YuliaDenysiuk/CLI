const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = async () => {
    const contacts = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        }
        return data;
    });
    return JSON.parse(contacts);
}

const listContacts = async () => {
    return await contactsPath();
}

const getContactById = async (contactId) => {
    const contacts = await contactsPath();
    const [contact] = contacts.filter(contact => contact.id === contactId);
    return contact;
}

const removeContact = async (contactId) => {
    const contacts = await contactsPath();
    contacts.map(contact => {
        if (contact.id === contactId) {
            const index = contacts.indexOf(contact);
            contacts.splice(index, 1);
        };
    });
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2));
    return contacts;
}

const addContact = async (name, email, phone) => {
    const contacts = await contactsPath();
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}