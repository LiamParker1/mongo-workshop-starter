import { Contact } from "./schema.js";

/**
 * Retrieves all contacts from the database.
 *
 * @returns a list of contacts
 */
export async function retrieveContacts() {
  return await Contact.find({}); // Empty object means "find all"
}

/**
 * Creates a new contact.
 *
 * @param contact the contact to create. Must have a name. optionally a phoneNumber and funFact.
 * @returns the newly created contact, including a uniquely generated _id value.
 * @throws error if the contact has no name, or a non-unique name.
 */
export async function createContact(contact) {
  const dbContact = new Contact(contact);
  await dbContact.save(); // Will throw an exception if the name is not given or unique
  return dbContact;
}

/**
 * Updates the contact with the given _id.
 * @param id the id to search
 * @param contact the update info
 * @returns true if a contact was updated, false otherwise.
 * @throws error if trying to update the contact's name to another name that's already taken.
 */
export async function updateContact(id, contact) {
  // Returns an object with the updated contact
  const dbContact = await Contact.findByIdAndUpdate(id, contact);
  return !!dbContact; // If dbContact is null or undefined, returns false. Otherwise true
}

/**
 * Deletes the contact with the given id, if any.
 *
 * @param id the id to search
 */
export async function deleteContact(id) {
  await Contact.deleteOne({ _id: id});
}
