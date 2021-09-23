import {userConstants} from "../Constants/user/user.constants";


// function to verify input
//exported
function verifyEmail(email) {
    if (!validateEmail(email)) {
        validEmail(false);
        return { success:false, errorMsg: userConstants.userError.EMAIL_ERROR };
    } else {
        validEmail(true);
        return { success: true };
    }
}

function verifyLogin(login) {
    if (login.length < 6 || login.length > 100) {
        validLogin(false);
        return { success:false, errorMsg: userConstants.userError.LOGIN_ERROR };
    } else {
        validLogin(true);
        return { success: true };
    }
}

function verifyPassword(password) {
    if (password.length < 8 || password.length > 100) {
        validPassword(false);
        return { success: false, errorMsg: userConstants.userError.PASSWORD_ERROR_LENGHT };
    } else {
        validPassword(true);
        return { success: true };
    }
}

function comparePassword(password, confirmPassword) {
    if (confirmPassword !== password) {
        validConfirmPassword(false);
        return { success: false, errorMsg: userConstants.userError.PASSWORD_CONFIRM_ERROR };
    } else {
        return { success: true };
    }
}

function verifyFirstname(firstname) {
    if (firstname.length < 2 || firstname.length > 100) {
        validFirstname(false);
        return { success: false, errorMsg: userConstants.userError.FIRSTNAME_ERROR };
    } else {
        validFirstname(true);
        return { success: true };
    }
}

function verifyLastname(lastname){
    if(lastname.length > 0) {
        if (lastname.length < 2 || lastname > 100) {
            validLastname(false);
            return { success: false, errorMsg: userConstants.userError.LASTNAME_ERROR };
        } else {
            validLastname(true);
            return { success: true };
        }
    } else {
        return { success: true };
    }
}

function verifyBirthday(birthday) {
    if(birthday.length > 0) {
        let verifyBirthday = isDate(birthday);
        if(!verifyBirthday.success) {
            return { success: false, errorMsg: userConstants.userError.BIRTHDAY_ERROR };
        } else {
            return { success: true };
        }
    } else {
        return { success: true };
    }
}

//unexported
//function to verify Email

function validateEmail(email) {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function isDate(date) {
    if(!(new Date(date) !== "Invalid Date") && !isNaN(new Date(date))) {
        return { success: false }
    } else {
        return { success: true }
    }
}

// function to display icon valid or not on input

function displayTrue(inputID) {
    let element = document.getElementById(inputID)
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
}

function displayNone(inputID) {
    let element = document.getElementById(inputID)
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}

function displayFalse(inputID) {
    let element = document.getElementById(inputID)
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

function validLogin(valid) {
    if(!valid) {
        displayFalse('login_input');
    } else {
        displayTrue('login_input');
    }
}

function validEmail(valid) {
    if(!valid) {
        displayFalse('email_input');
    } else {
        displayTrue('email_input');
    }
}

function validPassword(valid) {
    if(!valid) {
        displayFalse('password_input')
    } else {
        displayTrue('password_input');
    }
}

function validConfirmPassword(valid) {
    if(!valid) {
        displayFalse('Confirm_password_input')
    } else {
        displayTrue('Confirm_password_input');
    }
}

function validFirstname(valid) {
    if(!valid) {
        displayFalse('firstname_input');
    } else {
        displayTrue('firstname_input');
    }
}

function validLastname(valid) {
    if(!valid) {
        displayFalse('lastname_input')
    } else {
        displayTrue('lastname_input');
    }
}

function validBirthday(valid) {
    if(!valid) {
        displayFalse('birthday_input');
    } else {
        displayTrue('birthday_input')
    }
}

export {
    verifyEmail,
    verifyLogin,
    verifyPassword,
    verifyFirstname,
    verifyLastname,
    verifyBirthday,
    comparePassword,
    validLastname,
    validEmail,
    validPassword,
    validFirstname,
    validLogin,
    validBirthday,
    displayNone,
}
