/** @format */

import './style.css';

function ContactList({ contacts, onDeleteContact, onEdit, enable }) {
	return (
		<>
			{contacts.map(({ id, name, number }) => (
				<div
					className='contact-containet'
					key={id}
					onClick={onEdit}
					data-id={id}
					data-name={name}
					data-number={number}
				>
					<p className='contact'>
						{name} {number}
					</p>
					<button
						id={id}
						className='del-button button'
						type='submit'
						onClick={onDeleteContact}
						disabled={enable}
					>
						Delete
					</button>
				</div>
			))}
		</>
	);
}

export default ContactList;
