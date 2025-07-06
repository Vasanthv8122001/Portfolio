const validateContactName = (name) => {
    const nameTrimmed = name?.trim();
    const regex = /^[A-Za-z\s]{3,20}$/; // Letters and spaces only, length 3-20

    if (!name?.trim()) {
        return {
            err: true,
            errMsg: "Full Name is required."
        };
    }
    if (nameTrimmed.length < 3) {
        return {
            err: true,
            errMsg: "Name must be at least 3 characters."
        };
    }
    if (nameTrimmed.length > 20) {
        return {
            err: true,
            errMsg: "Name must be at most 20 characters."
        }
    }
    if (!regex.test(nameTrimmed)) {
        return {
            err: true,
            errMsg: "Name can only contain letters and spaces, no numbers or special characters."
        }
    }

    return {
        err: false,
        errMsg: ""
    };
}

const validateEmail = (email) => {
    const trimmedEmail = email?.trim();

    if (trimmedEmail.length === 0) {
        return {
            err: true,
            errMsg: "Email is required"
        };
    }
    if (trimmedEmail.length > 50) {
        return {
            err: true,
            errMsg: "Email must be at most 50 characters"
        };
    }

    // Check exactly one @ symbol
    const atCount = (trimmedEmail.match(/@/g) || []).length;
    if (atCount !== 1) {
        return {
            err: true,
            errMsg: "Email must contain exactly one '@' symbol"
        };
    }

    const consecutiveSpecialChars = /[!@#$%^&*(),.?":{}|<>_\-+=\/\\~`[\];']{2,}/;

    if (consecutiveSpecialChars.test(trimmedEmail)) {
        return {
            err: true,
            errMsg: "Special characters should not be continuous"
        };
    }

    // Regex to check ending with .com, .co, or .in
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co|in)$/;

    if (!emailRegex.test(trimmedEmail)) {
        return {
            err: true,
            errMsg: "Email must end with .com, .co, or .in"
        };
    }


    return {
        err: false,
        errMsg: ""
    };
}

const validatePhoneNumber = (phone) => {
    const trimmedPhone = phone?.trim();

    if (trimmedPhone.length === 0) {
        return {
            err: true,
            errMsg: "Phone number is required."
        };
    }
    if (trimmedPhone.length > 14) {
        return {
            err: true,
            errMsg: "Phone number must be at most 14 digits."
        };
    }
    if (!/^[\d\(\)\-\s]+$/.test(trimmedPhone)) {
        return {
            err: true,
            errMsg: "Phone number must contain digits only."
        };
    }

    return {
        err: false,
        errMsg: ""
    };
}

const validateEmailSubject = (subject) => {
    const trimmedSubject = subject?.trim();

    if (trimmedSubject.length === 0) {
        return {
            err: true,
            errMsg: "Subject is required."
        };
    }

    // Only allow letters, numbers, spaces, ! and ,
    const validSubjectRegex = /^[A-Za-z0-9!,\s]+$/;

    if (!validSubjectRegex.test(trimmedSubject)) {
        return {
            err: true,
            errMsg: "Only letters, numbers, spaces, ! and , are allowed."
        };
    }

    return {
        err: false,
        errMsg: ""
    };
}

const validateMessage = (message) => {
    const trimmedMessage = message?.trim();

     if (trimmedMessage.length === 0) {
        return {
            err: true,
            errMsg: "Message is required."
        };
    }
    if (trimmedMessage.length < 3) {
        return {
            err: true,
            errMsg: "Message must be at least 3 characters long."
        };
    }

    if (trimmedMessage.length > 500) {
        return {
            err: true,
            errMsg: "Message must not exceed 500 characters."
        };
    }

    // Check for two or more special characters continuously
    const continuousSpecialCharsRegex = /[!@#$%^&*(),.?":{}|<>_\-+=\/\\~`[\];']{2,}/;

    if (continuousSpecialCharsRegex.test(trimmedMessage)) {
        return {
            err: true,
            errMsg: "Special characters should not appear continuously."
        };
    }

    return {
        err: false,
        errMsg: ""
    };
}

export{
    validateContactName,
    validateEmail,
    validatePhoneNumber,
    validateEmailSubject,
    validateMessage,
}
