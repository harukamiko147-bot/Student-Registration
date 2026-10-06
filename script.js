
const registrationForm = document.getElementById("registrationForm");

const studentName = document.getElementById("studentName");
const studentNumber = document.getElementById("studentNumber");
const email = document.getElementById("email");
const workshop = document.getElementById("workshop");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const studentNumberError = document.getElementById("studentNumberError");
const emailError = document.getElementById("emailError");
const workshopError = document.getElementById("workshopError");
const termsError = document.getElementById("termsError");

const registerBtn = document.getElementById("registerBtn");
const clearBtn = document.getElementById("clearBtn");

const registrationResult = document.getElementById("registrationResult");

const summaryName = document.getElementById("summaryName");
const summaryStudentNumber = document.getElementById("summaryStudentNumber");
const summaryEmail = document.getElementById("summaryEmail");
const summaryWorkshop = document.getElementById("summaryWorkshop");

registrationResult.hidden = true;



function validateStudentInfo(name, studentNumber, email) {
    const validName =
        typeof name === "string" &&
        name.trim().length >= 3 &&
        !/\d/.test(name.trim()) &&
        name.trim() !== "";

    const studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validStudentNumber =
        typeof studentNumber === "string" &&
        studentNumberPattern.test(studentNumber.trim());

    const validEmail =
        typeof email === "string" &&
        emailPattern.test(email.trim());

    return validName && validStudentNumber && validEmail;
}


function clearErrors() {
    nameError.textContent = "";
    studentNumberError.textContent = "";
    emailError.textContent = "";
    workshopError.textContent = "";
    termsError.textContent = "";
}


registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    const nameValue = studentName.value.trim();
    const studentNumberValue = studentNumber.value.trim();
    const emailValue = email.value.trim();

    let isValid = true;

    if (
        nameValue.length < 3 ||
        /\d/.test(nameValue) ||
        nameValue === ""
    ) {
        nameError.textContent = "Enter a valid student name.";
        isValid = false;
    }

    const studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;

    if (!studentNumberPattern.test(studentNumberValue)) {
        studentNumberError.textContent =
            "Enter a valid student number.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    if (workshop.value === "") {
        workshopError.textContent = "Please select a workshop.";
        isValid = false;
    }
    if (!terms.checked) {
        termsError.textContent =
            "You must accept the Terms and Conditions.";
        isValid = false;
    }

    if (!isValid) {
        registrationResult.hidden = true;
        return;
    }

    if (!validateStudentInfo(nameValue, studentNumberValue, emailValue)) {
        registrationResult.hidden = true;
        return;
    }

    summaryName.textContent = nameValue;
    summaryStudentNumber.textContent = studentNumberValue;
    summaryEmail.textContent = emailValue;
    summaryWorkshop.textContent = workshop.value;

    registrationResult.hidden = false;
});


clearBtn.addEventListener("click", function () {
    studentName.value = "";
    studentNumber.value = "";
    email.value = "";

    workshop.selectedIndex = 0;

    terms.checked = false;

    clearErrors();

    registrationResult.hidden = true;

    summaryName.textContent = "";
    summaryStudentNumber.textContent = "";
    summaryEmail.textContent = "";
    summaryWorkshop.textContent = "";
});
