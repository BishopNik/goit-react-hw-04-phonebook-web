/** @format */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm({ onSubmitForm, onEditValue, nameButton }) {
	// eslint-disable-next-line no-unused-vars
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	useEffect(() => {
		const { id, name, number } = onEditValue;
		setId(id);
		setName(name);
		setNumber(number);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onEditValue]);

	const schema = yup.object({
		name: yup.string().min(2).required('Name is required'),
		number: yup.string().min(6).max(13).required('Number is required'),
	});

	const handlerOnChange = ({ target }) => {
		switch (target.name) {
			case 'name':
				setName(target.value);
				break;
			case 'number':
				setNumber(target.value);
				break;
			default:
				break;
		}
	};

	const handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	const handleSubmit = e => {
		e.preventDefault();

		const validateObj = { name, number };
		schema
			.validate(validateObj)
			.then(async () => {
				const res = await onSubmitForm({ id, name, number });
				setId(res.id);
				setName(res.name);
				setNumber(res.number);
			})
			.catch(validationErrors => {
				toast.error(`Error: ${validationErrors.errors}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
				});
			});
	};

	return (
		<>
			<form className='form-contact' onSubmit={handleSubmit}>
				<label className='label'>
					Name
					<input
						className='input-field'
						value={name}
						type='text'
						name='name'
						pattern="^[a-zA-Zа-яА-Я]+([' \-]?[a-zA-Zа-яА-Я ])*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
						autoComplete='off'
						onChange={handlerOnChange}
					/>
				</label>
				<label className='label'>
					Number
					<input
						className='input-field'
						value={number}
						type='tel'
						name='number'
						pattern='\+?\d{1,4}[\-.\s]?\(?\d{1,3}\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
						title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
						required
						autoComplete='off'
						onChange={handlerOnChange}
					/>
				</label>
				<button className='add-contact button' type='submit' onClick={handleClick}>
					{nameButton}
				</button>
			</form>
			<ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
		</>
	);
}

ContactForm.propTypes = {
	onEditValue: PropTypes.exact({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
		edit: PropTypes.bool,
	}).isRequired,
	onSubmitForm: PropTypes.func.isRequired,
	nameButton: PropTypes.string.isRequired,
};

export default ContactForm;
