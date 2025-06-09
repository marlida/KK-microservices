import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message: string) => {
	toast.dismiss();
	toast.success(message, {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "light",
		transition: Slide,
		style: {
			backgroundColor: "rgba(255, 255, 255, 0.9)",
			backdropFilter: "blur(10px)",
			border: "1px solid rgba(0, 0, 0, 0.1)",
			borderRadius: "8px",
			boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
			color: "#374151",
		},
	});
};


export const showErrorToast = (message: string) => {
	toast.dismiss();
	toast.error(message, {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "light",
		transition: Slide,
		style: {
			backgroundColor: "rgba(255, 255, 255, 0.9)",
			backdropFilter: "blur(10px)",
			border: "1px solid rgba(0, 0, 0, 0.1)",
			borderRadius: "8px",
			boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
			color: "#374151",
		},
	});
};