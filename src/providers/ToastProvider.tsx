import React from "react";

import { ToastContainer, toast as toastify_toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Custom toast functions to adjust style a little
const toast = (message: string) => {
	toastify_toast.dark(message, {
		progressStyle: { background: "var(--ol-gradient-light)" }
	});
};

const toastWarn = (message: string) => {
	toastify_toast.warn(message, {
		style: { color: "var(--ol-text-colour-contrast)" },
	});
};
const toastError = (message: string) => {
	toastify_toast.error(message, {
		style: { color: "var(--ol-text-colour-contrast)" },
	});
};

toast.warn = toastWarn;
toast.error = toastError;

const ToastProvider: React.FC = ({ children }) => {

	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				draggable={false}
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				limit={3}
			></ToastContainer>
			{children}
		</>
	)
}

export default ToastProvider;
export { toast };