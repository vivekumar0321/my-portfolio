import { toast } from "react-toastify";

const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

const Toast = {
    success: (message) =>
        toast.success(message, defaultOptions),

    error: (message) =>
        toast.error(message, defaultOptions),

    warning: (message) =>
        toast.warning(message, defaultOptions),

    info: (message) =>
        toast.info(message, defaultOptions),

    loading: (message = "Please wait...") =>
        toast.loading(message),

    update: (id, message, type = "success") =>
        toast.update(id, {
            render: message,
            type,
            isLoading: false,
            autoClose: 3000,
        }),

    dismiss: (id) => toast.dismiss(id),

    promise: (promise, messages) =>
        toast.promise(promise, {
            pending: messages.pending || "Loading...",
            success: messages.success || "Success",
            error: messages.error || "Something went wrong",
        }),
};

export default Toast;