// src/utils/toast.js

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

/**
 * Success Toast
 */
export const successToast = (message, options = {}) => {
    return toast.success(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Error Toast
 */
export const errorToast = (message, options = {}) => {
    return toast.error(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Warning Toast
 */
export const warningToast = (message, options = {}) => {
    return toast.warning(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Info Toast
 */
export const infoToast = (message, options = {}) => {
    return toast.info(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Loading Toast
 */
export const loadingToast = (message = "Please wait...") => {
    return toast.loading(message);
};

/**
 * Update Loading Toast
 */
export const updateToast = (
    id,
    message,
    type = "success",
    options = {}
) => {
    toast.update(id, {
        render: message,
        type,
        isLoading: false,
        autoClose: 3000,
        ...options,
    });
};

/**
 * Dismiss Toast
 */
export const dismissToast = (id) => {
    toast.dismiss(id);
};

/**
 * Promise Toast
 */
export const promiseToast = (promise, messages = {}) => {
    return toast.promise(promise, {
        pending: messages.pending || "Loading...",
        success: messages.success || "Success",
        error: messages.error || "Something went wrong",
    });
};

// const toastId = loadingToast("Uploading...");
// updateToast(toastId, "Upload completed.");
// dismissToast(toastId);