import AnimationWrapper from "./AnimationWrapper.jsx";
import Accordion from "./Accordion.jsx";
import {useContext, useState} from "react";
import formCat from '../../public/formCat.png';
import { ContentContext } from "./ContentContext.jsx";

export default function Form() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {content}  = useContext(ContentContext);
    let formContent = content.filter(item => item.sectionId === "form").sort((a, b) => a.order - b.order);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        dataManagementAccepted: false
    });

    let baseUrl = import.meta.env.VITE_BASE_URL;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${baseUrl}/Email/AddEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name: formData.name,
                    EmailAddress: formData.email,
                    PhoneNumber: formData.phone,
                    Message: formData.message
                })
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    dataManagementAccepted: false
                });
            } else {
                alert("Error submitting the form.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Something went wrong. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    let inputClasses = "border-b-amber-50 border-b-2 text-xl w-full focus:outline-0 pt-2 mb-6 pb-1";
    return (
        <div id="form" className="lg:flex gap-16 pt-16 lg:pt-0 pb-12">
            <div className="flex-1/2 pb-8">
                <AnimationWrapper delay="0.2s">
                    <img className="mb-2 shadow-gray-50" alt="neon cat" src={formCat} />
                </AnimationWrapper>
                <AnimationWrapper delay="0.4s">
                    <Accordion title={"Click here to see data management information."} content={formContent[1].textContent}/>
                </AnimationWrapper>
            </div>

            <div className="flex-1/2">
                <AnimationWrapper delay="0.6s">
                    <h3 className="text-4xl md:text-7xl uppercase font-bold pb-16">{formContent[0].textContent}</h3>
                    <form id="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="text-xl">Name:</label>
                        <input className={inputClasses} name="name" type="text" required value={formData.name} onChange={handleChange}/>
                        <label htmlFor="email" className="text-xl">Email:</label>
                        <input className={inputClasses} name="email" type="email" required value={formData.email} onChange={handleChange}/>
                        <label htmlFor="phone" className="text-xl">Phone:</label>
                        <input className={inputClasses} name="phone" type="tel" required value={formData.phone} onChange={handleChange}/>
                        <label htmlFor="message" className="text-xl">Message:</label>
                        <textarea className={inputClasses} name="message" required rows="4" value={formData.message} onChange={handleChange}/>
                        <label htmlFor="dataManagementInformation" className="flex mb-8">
                            <input type="checkbox" className="custom-checkbox" name="dataManagementAccepted" checked={formData.dataManagementAccepted}
                                   onChange={handleChange} required/>
                            <p className="ps-4">I accept the data management information.</p>
                        </label>
                        <button
                            disabled={isSubmitting}
                            className="!text-xl !text-stone-50 !border-[#00bcff] !border-2 !bg-transparent !transition duration-300 hover:!bg-[#00bcff] hover:!text-stone-950 text-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-6 py-2"
                            type="submit"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-5 w-5 text-[#00bcff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            )}
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </AnimationWrapper>
            </div>
        </div>
    )
}