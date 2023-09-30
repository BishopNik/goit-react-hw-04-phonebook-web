/** @format */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import * as API from './fetch_api';
import Filter from './filter';
import ContactList from './contactlist';
import ContactForm from './contactform';
import toastWindow from './toastwindow.js';
import './style.css';

const DEFAULTCONTACTS = [
	{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
	{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
	{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
	{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
	const [contacts, setContacts] = useState([]);
	const [contact, setContact] = useState({ id: '', name: '', number: '', edit: false });
	const [filter, setFilter] = useState('');
	const [active, setActive] = useState(false);
	const [button, setButton] = useState('Add contact');

	useEffect(() => {
		async function fetchData() {
			try {
				const savedContacts = await API.fetchGet();
				if (savedContacts.length > 0) {
					setContacts(savedContacts);
				}
			} catch ({ message }) {
				toastWindow(`Error loading: ${message}`);
				setContacts(DEFAULTCONTACTS);
			}
		}
		fetchData();
	}, []);

	const filteredContacts = contacts.filter(contact =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);

	const handlerOnFitred = ({ target }) => {
		setFilter(target.value);
	};

	const addContact = async newContact => {
		const { id, name, number } = newContact;
		try {
			if (contact.edit) {
				const edCont = { id, name, number };
				const editItem = await API.fetchPut(edCont);
				savedContact(editItem);
				setButton('Add contact');
			} else {
				const newItem = await API.fetchPost({ name, number });
				savedContact(newItem);
			}
		} catch ({ message }) {
			toastWindow(`Error: ${message}`);
		}
		window.addEventListener('keydown', onClearForm);
	};

	const handleAddContact = async newContact => {
		const checkName = contacts.find(
			contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
		);
		if (checkName && !contact.edit) {
			toastWindow(`${checkName.name} is already in contacts.`);
			return newContact;
		}
		addContact(newContact);
		return { id: '', name: '', number: '' };
	};

	const handleEditContact = ({ currentTarget, target }) => {
		if (target.classList.contains('del-button')) {
			return;
		}
		setActive(true);
		setButton('Edit contact');
		const value = currentTarget.dataset;
		scrollToTop();
		setContact({ id: value.id, name: value.name, number: value.number, edit: true });
		window.addEventListener('keydown', onClearForm);
	};

	const onClearForm = ({ code }) => {
		if (code === 'Escape') {
			setContact({ id: '', name: '', number: '', edit: false });
			setActive(false);
			setButton('Add contact');
			window.removeEventListener('keydown', onClearForm);
		}
	};

	const savedContact = ({ id, name, number }) => {
		if (active) {
			const newContacts = contacts.map(item => {
				if (item.id === id) {
					return { id, name, number };
				} else return item;
			});
			setContacts(newContacts);
			setActive(false);
		} else {
			setContacts([
				...contacts,
				{
					id,
					name,
					number,
				},
			]);
		}
	};

	const handleDelClick = async ({ target }) => {
		setActive(true);
		const updatedContacts = [];
		for (const contact of contacts) {
			if (contact.id === target.id) {
				try {
					await API.fetchDel(contact.id);
				} catch ({ message }) {
					toastWindow(`Removal error: ${message}`);
					updatedContacts.push(contact);
				}
			} else {
				updatedContacts.push(contact);
			}
		}
		setContacts(updatedContacts);
		setContact({ id: '', name: '', number: '', edit: false });
		setActive(false);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='container'>
			<h1 className='title-name'>Phonebook</h1>

			<ContactForm
				onSubmitForm={handleAddContact}
				contacts={contacts}
				onEditValue={contact}
				nameButton={button}
			/>

			<h2 className='title-name'>Contacts</h2>

			<Filter onFiltred={handlerOnFitred} value={filter} />

			<ContactList
				contacts={filteredContacts}
				onDeleteContact={handleDelClick}
				enable={active}
				onEdit={handleEditContact}
			/>
			<ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
		</div>
	);
}

export default App;
