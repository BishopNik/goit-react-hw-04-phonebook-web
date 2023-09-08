/** @format */

import PropTypes from 'prop-types';
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

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})
	).isRequired,
	enable: PropTypes.bool.isRequired,
	onDeleteContact: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default ContactList;
