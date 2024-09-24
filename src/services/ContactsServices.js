// Fetch contacts
const FetchContacts = async (axiosPrivate, user_id) => {
    try {
        const response = await axiosPrivate.get(`/api/contacts/${user_id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
};

// Add new contact
const AddContact = async (axiosPrivate, contactData) => {
    try {
        const response = await axiosPrivate.post(`/api/contacts`, contactData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add contact.');
    }
};

// Delete contact
const DeleteContact = async (axiosPrivate, _id) => {
    try {
        await axiosPrivate.delete(`/api/contacts/${_id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return true;
    } catch (error) {
        throw new Error('Failed to delete contact.');
    }
};

// Update contact
const UpdateContact = async (axiosPrivate, _id, contactData) => {
    try {
        await axiosPrivate.put(`/api/contacts/${_id}`, contactData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return true;
    } catch (error) {
        throw new Error('Failed to update contact.');
    }
};

export { FetchContacts, AddContact, UpdateContact, DeleteContact }