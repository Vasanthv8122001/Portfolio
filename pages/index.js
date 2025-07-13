import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { validateContactName, validateEmail, validateEmailSubject, validateMessage, validatePhoneNumber } from "@/components/Common/validation";
import Error from "@/components/Toast/Error";
import axios from "axios";
import SpinnerLoader from "@/components/Common/Loader";
// import ScrollReveal from "scrollreveal";

export default function Home() {

    const containerRef = useRef(null);
    const menuIconRef = useRef(null);
    const navbarRef = useRef(null);

    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [message, setMessage] = useState("");

    const [fullNameError, setFullNameError] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [mobileNumberError, setMobileNumberError] = useState("");
    const [emailSubjectError, setEmailSubjectError] = useState("");
    const [messageError, setMessageError] = useState("");

    const [fullNameErrorMsg, setFullNameErrorMsg] = useState("");
    const [emailAddressErrorMsg, setEmailAddressErrorMsg] = useState("");
    const [mobileNumberErrorMsg, setMobileNumberErrorMsg] = useState("");
    const [emailSubjectErrorMsg, setEmailSubjectErrorMsg] = useState("");
    const [messageErrorMsg, setMessageErrorMsg] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [menuActive, setMenuActive] = useState(false);
    const [activeSection, setActiveSection] = useState({
        home: "active",
        about: "",
        education: "",
        portfolio: "",
        contact: "",
    })

    const handleActive = (type) => {
        console.log("type_1", type)
        let makeInActive = Object.keys(activeSection)?.filter(ele => ele != type)
        const makeInActiveObj = makeInActive?.reduce((acc, key) => {
            acc[key] = "";
            return acc
        }, {})
        setActiveSection({ ...makeInActiveObj, [type]: "active" })
        document.getElementById(`${type}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return document.getElementById(`${type}`)?.focus()
    }

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll("section");
        const containerRect = container.getBoundingClientRect();

        let newActive = {
            home: "",
            about: "",
            education: "",
            portfolio: "",
            contact: "",
        };

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const offsetTop = rect.top - containerRect.top;
            const offsetBottom = rect.bottom - containerRect.top;

            const isVisible = offsetBottom > 0 && offsetTop < containerRect.height;

            if (isVisible) {
                newActive[section.id] = "active";
                handleActive(section.id);
            }
        });

    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;
       
        const onScroll = () => handleScroll();

        container.addEventListener("scroll", onScroll);
        return () => {
            container.removeEventListener("scroll", onScroll);
        };
    }, [containerRef]);

    useEffect(() => {
        document.getElementById(`focus`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return document.getElementById('focus')?.focus()
    }, [])

    useEffect(() => {
        // document.getElementById(`focus`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // return document.getElementById('focus')?.focus()
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            const scrollY = window.scrollY;

            let newActiveSection = {
                home: "",
                about: "",
                education: "",
                portfolio: "",
                contact: "",
            };

            sections.forEach((sec) => {
                const offsetTop = sec.offsetTop - 150;
                const height = sec.offsetHeight;
                const id = sec.getAttribute("id");

                if (scrollY >= offsetTop && scrollY < offsetTop + height && id) {
                    newActiveSection = {
                        home: "",
                        about: "",
                        education: "",
                        portfolio: "",
                        contact: "",
                        [id]: "active", // Only one section should be active
                    };
                }
            });

            setActiveSection(newActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // for the mobile view
    useEffect(() => {
        const menuIcon = menuIconRef.current;
        const navbar = navbarRef.current;

        const handleMenuClick = () => {
            setMenuActive((prev) => !prev);
        };

        if (menuIcon) {
            menuIcon.addEventListener("click", handleMenuClick);
        }

        return () => {
            if (menuIcon) {
                menuIcon.removeEventListener("click", handleMenuClick);
            }
        };
    }, []);

    // for the animation in the sections
    // useEffect(() => {
    //     const initScrollReveal = async () => {
    //         if (typeof window !== "undefined") {
    //             const ScrollReveal = (await import("scrollreveal")).default;

    //             // Clear previous animations if needed
    //             ScrollReveal().clean(".home-content, .heading, .about, .education, .portfolio, .contact, .home-img, .education-container, .portfolio-box, .contact form");

    //             const sr = ScrollReveal({
    //                 distance: "80px",
    //                 duration: 2000,
    //                 delay: 200,
    //             });

    //             sr.reveal(".home-content, .heading", { origin: "top" });
    //             sr.reveal(".home-content h1, .about-img", { origin: "left" });
    //             sr.reveal(".home-content p, .about-content", { origin: "right" });
    //             sr.reveal(".home-img, .education-container, .portfolio-box, .contact form", {
    //                 origin: "bottom",
    //             });
    //         }
    //     };

    //     const timeout = setTimeout(() => {
    //         initScrollReveal();
    //     }, 100); // slight delay to ensure DOM updated

    //     return () => clearTimeout(timeout);
    // }, []); // Depend on activeSection to trigger animations when activeSection changes

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [])      

    const phoneNumberFormat = (value) => {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, '');

        // Limit to 10 digits
        const limitedDigits = digitsOnly.slice(0, 10);

        // Apply formatting: (###) ###-####
        let formatted = limitedDigits;

        if (limitedDigits.length >= 1) {
            formatted = `(${limitedDigits.slice(0, 3)}`;
        }
        if (limitedDigits.length >= 4) {
            formatted += `) ${limitedDigits.slice(3, 6)}`;
        }
        if (limitedDigits.length >= 7) {
            formatted += `-${limitedDigits.slice(6, 10)}`;
        }

        return formatted;
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "fullName" && value.length <= 20 && value?.[0] !== " ") {
            // Validate full name (e.g., check if it contains only letters and spaces)
            const nameRegex = /^[a-zA-Z\s]+$/;
            setFullName(value?.replace(/\s+/g, ' '));
            setFullNameError(false);
            setFullNameErrorMsg("");
        } else if (name === "emailAddress" && value.length <= 50 && value?.[0] !== " ") {
            // Validate email address (e.g., check if it matches a standard email format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailAddress(value?.replace(/\s+/g, ' '));
            setEmailAddressError(false);
            setEmailAddressErrorMsg("");
        } else if (name === "mobileNumber" && value.length <= 15 && /^[0-9()\-\s]*$/.test(value)) {
            setMobileNumber(phoneNumberFormat(value));
            setMobileNumberError(false);
            setMobileNumberErrorMsg("");
        } else if (name === "emailSubject" && value.length <= 50 && value?.[0] !== " ") {
            setEmailSubject(value?.replace(/\s+/g, ' '));
            setEmailSubjectError(false);
            setEmailSubjectErrorMsg("");
        } else if (name === "message" && value.length <= 500 && value?.[0] !== " ") {
            setMessage(value?.replace(/\s+/g, ' '));
            setMessageError(false);
            setMessageErrorMsg("");
        }

    }

    const handleOnBlur = async (e) => {
        const { name, value } = e.target;

        if (name === "fullName") {
            let validate = await validateContactName(value);
            setFullNameError(validate?.err);
            setFullNameErrorMsg(validate?.errMsg);
        } else if (name === "emailAddress") {
            let validate = await validateEmail(value);
            setEmailAddressError(validate?.err);
            setEmailAddressErrorMsg(validate?.errMsg);
        } else if (name === "mobileNumber") {
            let validate = await validatePhoneNumber(value);
            setMobileNumberError(validate?.err);
            setMobileNumberErrorMsg(validate?.errMsg);
        } else if (name === "emailSubject") {
            let validate = await validateEmailSubject(value);
            setEmailSubjectError(validate?.err);
            setEmailSubjectErrorMsg(validate?.errMsg);
        } else if (name === "message") {
            let validate = await validateMessage(value);
            setMessageError(validate?.err);
            setMessageErrorMsg(validate?.errMsg);
        }
    }

    const handleOnFocus = (e) => {
        const { name } = e.target;

        if (name === "fullName") {
            setFullNameError(false);
            setFullNameErrorMsg("");
        } else if (name === "emailAddress") {
            setEmailAddressError(false);
            setEmailAddressErrorMsg("");
        } else if (name === "mobileNumber") {
            setMobileNumberError(false);
            setMobileNumberErrorMsg("");
        } else if (name === "emailSubject") {
            setEmailSubjectError(false);
            setEmailSubjectErrorMsg("");
        } else if (name === "message") {
            setMessageError(false);
            setMessageErrorMsg("");
        }
    }

    const handleFocusErrorField = (name, emailAddress, mobileNumber, emailSubject, message) => {
        if (name?.err) {
            document.getElementById(`fullName`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('fullName')?.focus()
        }
        if (emailAddress?.err) {
            document.getElementById(`emailAddress`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('emailAddress')?.focus()
        }
        if (mobileNumber?.err) {
            document.getElementById(`mobileNumber`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('mobileNumber')?.focus()
        }
        if (emailSubjectValidate?.err) {
            document.getElementById(`emailSubject`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('emailSubject')?.focus()
        }
        if (messageValidate?.err) {
            document.getElementById(`message`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('message')?.focus()
        }

    }

    const handleOnSubmit = async (e) => {
        try {
            e?.preventDefault();
            let nameValidate = validateContactName(fullName);
            let emailValidate = validateEmail(emailAddress);
            let mobileValidate = validatePhoneNumber(mobileNumber);
            let emailSubjectValidate = validateEmailSubject(emailSubject);
            let messageValidate = validateMessage(message);
            setFullNameError(nameValidate?.err);
            setFullNameErrorMsg(nameValidate?.errMsg);
            setEmailAddressError(emailValidate?.err);
            setEmailAddressErrorMsg(emailValidate?.errMsg);
            setMobileNumberError(mobileValidate?.err);
            setMobileNumberErrorMsg(mobileValidate?.errMsg);
            setEmailSubjectError(emailSubjectValidate?.err);
            setEmailSubjectErrorMsg(emailSubjectValidate?.errMsg);
            setMessageError(messageValidate?.err);
            setMessageErrorMsg(messageValidate?.errMsg);
            if (nameValidate?.err || emailValidate?.err || mobileValidate?.err || emailSubjectValidate?.err || messageValidate?.err) {
                handleFocusErrorField(nameValidate, emailValidate, mobileValidate, emailSubjectValidate, messageValidate)
                setIsError(false)
                setErrorMessage("Please fill the form correctly")
                setTimeout(() => {
                    setIsError(true)
                    setErrorMessage("")

                }, 3000)
                return;
            }
            console.log("handleOnSubmit", fullName, emailAddress, mobileNumber, emailSubject, message);
            setIsLoading(true)
            const response = await axios.post(`/api/notification`, {
                fullName: fullName,
                emailAddress: emailAddress,
                mobileNumber: mobileNumber,
                emailSubject: emailSubject,
                message: message,
            });
            console.log("Form submitted successfully!");
            setFullName("");
            setEmailAddress("");
            setMobileNumber("");
            setEmailSubject("");
            setMessage("");
            setIsLoading(false)
            document.getElementById(`focus`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return document.getElementById('focus')?.focus()
        } catch (error) {
            console.log('error', error);
        }
        setIsLoading(false)
    }

    // if (isLoading) {
    //     return <>
    //         <SpinnerLoader />
    //     </>
    // }
    return (
        <div className="" ref={containerRef}>

            <header className="header">
                <a href="#" className="logo">Portfolio</a>
                <i className={`bx ${menuActive ? "bx-x" : "bx-menu"}`}
                    id="menu-icon"
                    ref={menuIconRef}></i>
                <nav className={`navbar ${menuActive ? "active" : ""}`}
                    ref={navbarRef} >
                    <a className={`${activeSection?.home} cursor-pointer`} onClick={() => { handleActive("home") }}>Home</a>
                    <a className={`${activeSection?.about} cursor-pointer`} onClick={() => { handleActive("about") }}>About</a>
                    <a className={`${activeSection?.education} cursor-pointer`} onClick={() => { handleActive("education") }}>Education</a>
                    <a className={`${activeSection?.portfolio} cursor-pointer`} onClick={() => { handleActive("portfolio") }}>Portfolio</a>
                    <a className={`${activeSection?.contact} cursor-pointer`} onClick={() => { handleActive("contact") }}>Contact</a>
                </nav>
            </header>
            <div id="focus"></div>
            <section className="home" id="home">
                <div className="container">
                    <div className="row align-items-center flex-column-reverse flex-md-row">

                        {/* Text Content */}
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="home-content">
                                <h3>Hello, I'm</h3>
                                <h1>Vasanth</h1>
                                <h3>
                                    A passionate <span>Web Developer</span>
                                </h3>
                                <p>
                                    I'm actively seeking opportunities that allow me to grow, challenge myself, and enhance both my skills and knowledge in full-stack development. I'm eager to contribute to innovative projects and collaborate with dynamic teams to build impactful digital solutions.
                                </p>
                                <div className="social-media">
                                    <a href="https://x.com/vasanthvv8122?t=VQP3pVnH9sdOtaGmW46ohg&s=31" target="_blank"><i className="bx bxl-twitter"></i></a>
                                    <a href="https://www.instagram.com/vasanth_vv_?igsh=c3p6M2hkY2FrbHgy" target="_blank"><i className="bx bxl-instagram"></i></a>
                                    <a href="https://www.linkedin.com/in/vasanth-v-b4210b238" target="_blank"><i className="bx bxl-linkedin"></i></a>
                                </div>
                                <a href="/Vasanth%20V.pdf" download="Vasanth V.pdf" target="_blank" className="btn">Download CV</a>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="col-md-6 text-center">
                            <div className="home-img">
                                <img
                                    src="/Vasanth V.webp"
                                    alt="Your image"
                                    className="responsive-img img-fluid d-block mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about" id="about" >
                <div className="container">
                    <div className="row align-items-center flex-column-reverse flex-md-row">

                        {/* Text Content */}
                        <div className="col-md-6 mt-4 mt-md-0">
                            <div className="about-content">
                                <h2 className="heading">
                                    About <span>Me</span>
                                </h2>
                                <h3>MERN Stack Developer</h3>
                                <p>
                                    I'm Vasanth, a dedicated MERN Stack Developer with a passion for creating dynamic and responsive web applications. I specialize in building full-stack solutions using MongoDB, Express, React, and Node.js, and I’m always eager to learn and work with the latest technologies.
                                    <br />I enjoy solving complex problems, collaborating with teams, and turning ideas into real-world digital experiences. Currently, I’m looking for opportunities where I can grow my skills, contribute to meaningful projects, and be a part of a forward-thinking tech environment.
                                </p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="col-md-6 text-center">
                            <div className="about-img">
                                <img src="/1000082049.webp" alt="Your image" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="education mb-5" id="education">
                <h2 className="heading">My <span>Journey</span></h2>
                <div className="education-row">
                    <div className="education-column">
                        <h3 className="title">Education</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <div className="content">
                                    <div className="d-flex align-items-center gap-2">
                                        <i class='bx bxs-calendar fs-4'></i>
                                        <div>
                                            <h3 className="mb-0">UG Degree</h3>
                                            <small className="text-muted fs-1">2019-2023 · B.E. in Electronics and Communication Engineering, Dr. N.G.P Institute of Technology - 8.49%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="education-box">
                            <div className="education-content">
                                <div className="content">
                                    <div className="d-flex align-items-center gap-2">
                                        <i class='bx bxs-calendar fs-4'></i>
                                        <div>
                                            <h3 className="mb-0">HSC</h3>
                                            <small className="text-muted fs-1">2018-2019 · High school, Sri kumaran school - 83.0%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="education-box">
                            <div className="education-content">
                                <div className="content">
                                    <div className="d-flex align-items-center gap-2">
                                        <i class='bx bxs-calendar fs-4'></i>
                                        <div>
                                            <h3 className="mb-0">SSLC</h3>
                                            <small className="text-muted fs-1">2016-2017 · Sri Ramakrishna school - 96.5%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="education-column">
                        <h3 className="title">Experience</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <div className="content">
                                    <div className="d-flex align-items-center gap-2">
                                        <i class='bx bxs-calendar fs-4'></i>
                                        <div>
                                            <h3 className="mb-0">Web Developer</h3>
                                            <small className="text-muted">2023 · Span Technology Services</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <section className="portfolio" id="portfolio">
                <h2 className="heading">Latest <span>Project</span></h2>

                <div className="portfolio-container">
                    <div className="portfolio-box">
                        <img src="https://wallpapers.com/images/hd/food-4k-spdnpz7bhmx4kv2r.jpg" alt="Your image" />

                        <div className="portfolio-layer">
                            <h4>Covai cafe</h4>
                            <p>We built a smart food ordering platform that streamlined daily meals while promoting food as a tool for mental and emotional well-being.</p>
                        </div>
                    </div>
                    <div className="portfolio-box">
                        <img src="https://media.ajco.de/_processed_/a/1/csm_Leadmanagement_4221002f16.jpg" alt="Your image" />

                        <div className="portfolio-layer">
                            <h4>Lead management</h4>
                            <p> Managed user accounts and tracked user interests to align with application objectives and enhance user engagement.</p>
                        </div>
                    </div>

                    <div className="portfolio-box">
                        <img src="https://th.bing.com/th/id/OIP.E9pC2aLxeHYTRUJM-k9O1wHaFj?rs=1&pid=ImgDetMain" alt="Your image" />

                        <div className="portfolio-layer">
                            <h4>WealthRabbit</h4>
                            <p>Created a customized retirement benefits plan that aligned with employee goals and company strategy, strengthening retention and satisfaction.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="contact" id="contact">
                <h2 className="heading">Contact <span>Me!</span></h2>
                <form className="mx-auto w-75">
                    <div className="input-row d-flex flex-column flex-md-row gap-3">
                        <div className="input-group w-100">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={fullName}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                onChange={handleOnChange}
                                placeholder="Full Name"
                            />
                            {fullNameError && <p className="error-text">{fullNameErrorMsg}</p>}
                        </div>
                        <div className="input-group w-100">
                            <input
                                type="text"
                                name="emailAddress"
                                id="emailAddress"
                                value={emailAddress}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                onChange={handleOnChange}
                                placeholder="Email Address"
                            />
                            {emailAddressError && <p className="error-text">{emailAddressErrorMsg}</p>}
                        </div>
                    </div>

                    {/* Row 2: Mobile Number & Email Subject */}
                    <div className="input-row d-flex flex-column flex-md-row gap-3">
                        <div className="input-group w-100">
                            <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                value={mobileNumber}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                onChange={handleOnChange}
                                placeholder="Mobile Number"
                            />
                            {mobileNumberError && <p className="error-text">{mobileNumberErrorMsg}</p>}
                        </div>
                        <div className="input-group w-100">
                            <input
                                type="text"
                                name="emailSubject"
                                id="emailSubject"
                                value={emailSubject}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                onChange={handleOnChange}
                                placeholder="Email Subject"
                            />
                            {emailSubjectError && <p className="error-text">{emailSubjectErrorMsg}</p>}
                        </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="input-row">
                        <div className="input-group full-width">
                            <textarea
                                placeholder="Your Message"
                                name="message"
                                id="message"
                                value={message}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                                onChange={handleOnChange}
                                rows="6"
                            ></textarea>
                            {messageError && <p className="error-text">{messageErrorMsg}</p>}
                        </div>
                    </div>

                    {!isLoading && <div className="button-container">
                        <button type="submit" className="btn" onClick={handleOnSubmit}>Send Message</button>
                    </div>}
                    {isLoading && <div className="button-container">
                        <button type="submit" className="btn" disabled>Sending Message...</button>
                    </div>}

                </form>
            </section>

            <footer class="footer" >
                <div class="footer-text">
                    <p>Copyright &copy; 2025 </p>
                </div>
                <div class="footer-iconTop ">
                    <a className="cursor-pointer" onClick={() => { handleActive("home") }}><i class='bx bx-up-arrow-alt'></i></a>
                </div>
            </footer>
        </div>
    );
}
