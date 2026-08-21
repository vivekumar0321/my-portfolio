export const successResponse = (data = null, message = "") => ({
    success: true,
    data,
    message,
});

export const errorResponse = (message = "Something went wrong") => ({
    success: false,
    data: null,
    message,
});