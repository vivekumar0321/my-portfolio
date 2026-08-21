import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInputModule from "react-phone-input-2";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaSpinner,
  FaWhatsapp,
} from "react-icons/fa";

import SectionTitle from "../components/common/SectionTitle";
import data from "../data/portfolio.json";

import "react-phone-input-2/lib/style.css";
import "./Contact.css";
import { storeContact } from "../services/contactService";
import { sendContactEmail } from "../services/web3FormsService";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const PhoneInput = PhoneInputModule.default || PhoneInputModule;

const ALLOWED_FILE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "pdf",
  "doc",
  "docx",
  "zip",
];

const getFileExtension = (fileName = "") => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Please enter your name.")
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  countryIso: Yup.string().required("Please select a country."),

  dialCode: Yup.string().required("Country dial code is required."),

  phone: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d+$/, "Phone number can contain digits only.")
    .test(
      "valid-phone-length",
      "Please enter a valid phone number.",
      (value) => {
        if (!value) return false;

        const completeNumber = value.replace(/\D/g, "");

        return completeNumber.length >= 7 && completeNumber.length <= 15;
      },
    ),

  isWhatsapp: Yup.boolean(),

  attachment: Yup.mixed()
    .nullable()
    .test("fileSize", "Maximum file size is 50 MB.", (file) => {
      if (!file) return true;

      return file.size <= MAX_FILE_SIZE;
    })
    .test(
      "fileType",
      "Only JPG, JPEG, PNG, PDF, DOC, DOCX and ZIP files are allowed.",
      (file) => {
        if (!file) return true;

        return ALLOWED_FILE_EXTENSIONS.includes(getFileExtension(file.name));
      },
    ),

  subject: Yup.string()
    .trim()
    .required("Subject is required.")
    .min(3, "Subject must be at least 3 characters.")
    .max(200, "Subject cannot exceed 200 characters."),

  message: Yup.string()
    .trim()
    .required("Message is required.")
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message cannot exceed 5000 characters."),
});

const Contact = () => {
  const cardRefs = useRef([]);
  const fileInputRef = useRef(null);

  const { contact } = data;

  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contact?.email,
      href: `mailto:${contact?.email}`,
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: contact?.phone,
      href: `tel:${contact?.phone}`,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: contact?.whatsapp,
      href: `https://wa.me/${contact?.whatsapp?.replace(/\s/g, "")}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: contact?.address,
      href: contact?.map,
    },
  ];

  const clearSubmitStatus = () => {
    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      countryIso: "in",
      dialCode: "91",
      phone: "91",
      isWhatsapp: false,
      attachment: null,
      subject: "",
      message: "",
    },

    validationSchema,

    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitStatus({
        type: "",
        message: "",
      });

      try {
        const completePhoneNumber = values.phone.replace(/\D/g, "");

        const nationalPhoneNumber = completePhoneNumber.startsWith(
          values.dialCode,
        )
          ? completePhoneNumber.slice(values.dialCode.length)
          : completePhoneNumber;

        const payload = {
          name: values.name.trim(),
          email: values.email.trim(),
          country_iso: values.countryIso.toUpperCase(),
          country_code: `+${values.dialCode}`,
          phone: nationalPhoneNumber,
          full_phone_number: `+${completePhoneNumber}`,
          is_whatsapp: values.isWhatsapp,
          subject: values.subject.trim(),
          message: values.message.trim(),
        };

        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        if (values.attachment) {
          formData.append("attachment", values.attachment);
        }
        const res = await storeContact(payload);
        if (res.success) {
          await sendContactEmail(payload);
        }
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully!",
        });

        resetForm();

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Contact form submission failed:", error);

        setSubmitStatus({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (event) => {
    clearSubmitStatus();
    formik.handleChange(event);
  };

  const handlePhoneChange = (value, countryData) => {
    clearSubmitStatus();

    formik.setFieldValue("countryIso", countryData?.countryCode || "", false);

    formik.setFieldValue("dialCode", countryData?.dialCode || "", false);

    formik.setFieldValue("phone", value || "", true);
  };

  const handlePhoneBlur = () => {
    formik.setFieldTouched("phone", true, true);
  };

  const handleWhatsappChange = (event) => {
    clearSubmitStatus();

    formik.setFieldValue("isWhatsapp", event.target.checked, true);
  };

  const handleFileChange = (event) => {
    clearSubmitStatus();

    const file = event.currentTarget.files?.[0] || null;

    formik.setFieldValue("attachment", file, true);
    formik.setFieldTouched("attachment", true, false);
  };

  const phoneHasError = formik.touched.phone && Boolean(formik.errors.phone);

  const isSubmitDisabled =
    formik.isSubmitting || !formik.isValid || !formik.dirty;

  return (
    <section id="contact" className="section section-white">
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" />

        <div className="row g-5">
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-2 stagger-children">
              {contactItems.map((item, index) => (
                <div
                  key={item.label}
                  ref={(element) => {
                    cardRefs.current[800 + index] = element;
                  }}
                  className="card card--contact-info card-3d"
                   onMouseMove={handleMouseMove}
                                  onMouseLeave={handleMouseLeave}
                >
                  <div className="contact-icon">
                    <item.icon />
                  </div>

                  <div>
                    <p className="contact-label">{item.label}</p>

                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.label === "Address" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="contact-value"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card contact-form-card">
              <form onSubmit={formik.handleSubmit} noValidate>
                {submitStatus.message && (
                  <div
                    className={`contact-form-alert ${
                      submitStatus.type === "success"
                        ? "contact-form-alert--success"
                        : "contact-form-alert--error"
                    }`}
                    role="alert"
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="name">
                    Full Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.name}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={formik.isSubmitting}
                  />

                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="email">
                    Email Address *
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.email}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={formik.isSubmitting}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="phone">
                    Phone Number *
                  </label>

                  <PhoneInput
                    country={formik.values.countryIso}
                    value={formik.values.phone}
                    placeholder="Enter phone number"
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    enableSearch
                    autocompleteSearch
                    countryCodeEditable={false}
                    disableSearchIcon={false}
                    searchPlaceholder="Search country..."
                    searchNotFound="No country found"
                    preferredCountries={["in", "us", "gb", "ae", "au"]}
                    specialLabel=""
                    disabled={formik.isSubmitting}
                    inputProps={{
                      id: "phone",
                      name: "phone",
                      autoComplete: "tel",
                      inputMode: "tel",
                    }}
                    containerClass={`contact-phone-container ${
                      phoneHasError ? "contact-phone-container--invalid" : ""
                    }`}
                    inputClass="contact-phone-input"
                    buttonClass="contact-country-button"
                    dropdownClass="contact-country-dropdown"
                    searchClass="contact-country-search"
                  />

                  {phoneHasError && (
                    <div className="contact-field-error">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    id="isWhatsappCheck"
                    type="checkbox"
                    name="isWhatsapp"
                    className="form-check-input"
                    checked={formik.values.isWhatsapp}
                    onChange={handleWhatsappChange}
                    disabled={formik.isSubmitting}
                  />

                  <label className="form-check-label" htmlFor="isWhatsappCheck">
                    &nbsp;This number is also available on WhatsApp
                  </label>
                </div>

                {/* <div className="form-group mb-3">
                  <label className="form-label" htmlFor="attachment">
                    Attachment (optional)
                  </label>

                  <input
                    ref={fileInputRef}
                    id="attachment"
                    type="file"
                    name="attachment"
                    className={`form-control ${
                      formik.touched.attachment && formik.errors.attachment
                        ? "is-invalid"
                        : ""
                    }`}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip"
                    onChange={handleFileChange}
                    disabled={formik.isSubmitting}
                  />

                  <small className="contact-file-help text-muted">
                    Allowed: JPG, JPEG, PNG, PDF, DOC, DOCX, ZIP. Maximum size:
                    50 MB.
                  </small>

                  {formik.touched.attachment && formik.errors.attachment && (
                    <div className="contact-field-error">
                      {formik.errors.attachment}
                    </div>
                  )}
                </div> */}

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="subject">
                    Subject *
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    className={`form-control ${
                      formik.touched.subject && formik.errors.subject
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.subject}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="Inquiry about..."
                    disabled={formik.isSubmitting}
                  />

                  {formik.touched.subject && formik.errors.subject && (
                    <div className="invalid-feedback">
                      {formik.errors.subject}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="message">
                    Message *
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    name="message"
                    className={`form-control ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.message}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="Tell us about your project..."
                    disabled={formik.isSubmitting}
                  />

                  {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-submit-button"
                  disabled={isSubmitDisabled}
                >
                  {formik.isSubmitting ? (
                    <>
                      <FaSpinner className="contact-spinner me-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
