import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchContacts, UpdateContact, DeleteContact } from '../services/ContactsServices';
import { message } from 'antd';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (axiosPrivate, { rejectWithValue }) => {
        try {
            const user_id = JSON.parse(localStorage.getItem('user_data')).id;
            const contacts = await FetchContacts(axiosPrivate, user_id);
            return contacts;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ axiosPrivate, newContact }, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post('/api/contacts', newContact);
            return response.data; // Trả về contact vừa thêm
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ axiosPrivate, id, updatedContact }, { rejectWithValue }) => {
        try {
            await UpdateContact(axiosPrivate, id, updatedContact);
            return { id, updatedContact };
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async ({ axiosPrivate, id }, { rejectWithValue }) => {
        try {
            await DeleteContact(axiosPrivate, id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Search contacts
export const searchContacts = (searchTerm) => (dispatch, getState) => {
    const { contacts } = getState().contacts;
    const lowerCaseValue = searchTerm.toLowerCase();

    const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(lowerCaseValue) ||
        contact.phone_number.includes(lowerCaseValue) ||
        contact.email.toLowerCase().includes(lowerCaseValue)
    );

    if (filtered.length === 0) {
        message.error('No contact found.');
    }

    dispatch(setFilteredContacts(filtered));
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        filteredContacts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
            state.filteredContacts = action.payload;
        },
        setFilteredContacts: (state, action) => {
            state.filteredContacts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add contact';
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact._id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = {
                        ...state.contacts[index],
                        ...action.payload.updatedContact
                    };
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
            });
    },
});

export const { setContacts, setFilteredContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
