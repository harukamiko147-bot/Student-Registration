var studentNumberPattern;
var emailPattern;

var registrationForm;
var studentName;
var studentNumber;
var email;
var workshop;
var terms;

var nameError;
var studentNumberError;
var emailError;
var workshopError;
var termsError;

var registerBtn;
var clearBtn;
var registrationResult;

var summaryName;
var summaryStudentNumber;
var summaryEmail;
var summaryWorkshop;


// Get elements
registrationForm = document.getElementById("registrationForm");

studentName = document.getElementById("studentName");
studentNumber = document.getElementById("studentNumber");
email = document.getElementById("email");
workshop = document.getElementById("workshop");
terms = document.getElementById("terms");

nameError = document.getElementById("nameError");
studentNumberError = document.getElementById("studentNumberError");
emailError = document.getElementById("emailError");
workshopError = document.getElementById("workshopError");
termsError = document.getElementById("termsError");

registerBtn = document.getElementById("registerBtn");
clearBtn = document.getElementById("clearBtn");

registrationResult = document.getElementById("registrationResult");

summaryName = document.getElementById("summaryName");
summaryStudentNumber = document.getElementById("summaryStudentNumber");
summaryEmail = document.getElementById("summaryEmail");
summaryWorkshop = document.getElementById("summaryWorkshop");

registrationResult.hidden = true;


// Validation function
function validateStudentInfo(name, studentNumber, email) {

    var validName =
        typeof name === "string" &&
        name.trim().length >= 3 &&
        !/\d/.test(name.trim()) &&
        name.trim() !== "";

    studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var validStudentNumber =
        typeof studentNumber === "string" &&
        studentNumberPattern.test(studentNumber.trim());

    var validEmail =
        typeof email === "string" &&
        emailPattern.test(email.trim());

    return validName && validStudentNumber && validEmail;
}


// Clear errors
function clearErrors() {
    nameError.textContent = "";
    studentNumberError.textContent = "";
    emailError.textContent = "";
    workshopError.textContent = "";
    termsError.textContent = "";
}


// Submit form
registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    var nameValue = studentName.value.trim();
    var studentNumberValue = studentNumber.value.trim();
    var emailValue = email.value.trim();

    var isValid = true;

    if (
        nameValue.length < 3 ||
        /\d/.test(nameValue) ||
        nameValue === ""
    ) {
        nameError.textContent = "Enter a valid student name.";
        isValid = false;
    }

    studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;

    if (!studentNumberPattern.test(studentNumberValue)) {
        studentNumberError.textContent =
            "Enter a valid student number.";
        isValid = false;
    }

    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!validateStudentInfo(
        nameValue,
        studentNumberValue,
        emailValue
    )) {
        registrationResult.hidden = true;
        return;
    }

    summaryName.textContent = nameValue;
    summaryStudentNumber.textContent = studentNumberValue;
    summaryEmail.textContent = emailValue;
    summaryWorkshop.textContent = workshop.value;

    registrationResult.hidden = false;
});


// Clear button
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
