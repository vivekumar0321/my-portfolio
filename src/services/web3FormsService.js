// import api from "../api/api";

import api from "./api";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const sender_name = "Vivek Nishad";

/**
 * Send Contact Form Email
 */
export const sendContactEmail = async (formData) => {
    try {
        const payloadd = {
            access_key: ACCESS_KEY,

            name: formData.name,
            email: formData.email,
            country_code: formData.country_code,
            phone: formData.full_phone_number,
            company: formData.company,
            subject: "New Contact Form Inquiry",
            message: formData.message,

            from_name: `${sender_name} Portfolio`,
            replyto: formData.email,

        };

        const payload = {
            access_key: ACCESS_KEY,

            // Sender Details
            name: formData.name,
            email: formData.email,

            phone: formData.full_phone_number,
            whatsApp: formData.is_whatsapp ? "Available on WhatsApp" : "Not Available on WhatsApp",

            // Reply Information
            replyto: formData.email,
            from_name: `${sender_name} Portfolio`,

            // Internal Subject
            subject: "New Contact Form Inquiry",

            // User Content
            message: `
                Subject: ${formData.subject}
                Message: ${formData.message}
                `,
        };

        const { data } = await api.post("/submit", payload);

        return data;
    } catch (error) {
        console.error("Contact Email Error:", error);

        return {
            success: false,
            message: error.response?.data?.message || error.message || "Something went wrong.",
        };
    }
};

/**
 * Send Newsletter Subscription Email
 */
export const sendSubscriberEmail = async (email) => {
    try {
        const payload = {
            access_key: ACCESS_KEY,

            email,

            subject: "New Newsletter Subscription",

            from_name: `${sender_name} Portfolio`,

            message: `A new user subscribed to the newsletter. Email: ${email}`,


        };

        const { data } = await api.post("/submit", payload);

        return data;
    } catch (error) {
        console.error("Subscriber Email Error:", error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong.",
        };
    }
};