/** @format */

import { toast } from 'react-toastify';

function toastWindow(mes) {
	toast.error(mes, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'colored',
	});
}

export default toastWindow;
