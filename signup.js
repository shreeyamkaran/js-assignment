import users from "./users.js";

const username = document.getElementById("username");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const dob = document.getElementById("dob");
const eid = document.getElementById("eid");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const fileField = document.getElementById("file");
const password = document.getElementById("password");
const designation = document.getElementById("designation");
const address = document.getElementById("address");
const link = document.getElementById("link");
const language = document.getElementById("language");

const btn = document.getElementById("submit");

// image upload
let base64Image = null;
let imageElement = document.querySelector("img");

fileField.addEventListener("change", () => {
    const file = fileField.files[0];
    if(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            console.log(event.target.result);
            
            imageElement.src = event.target.result;
            base64Image = event.target.result;
        };

        reader.readAsDataURL(file);
    }
    
});

btn.addEventListener("click", () => {
    // validate inputs
    // username
    if(username.value.trim() == "") {
        window.alert("username cannot be empty");
        return;
    }

    let validUsername = validateUsername(username.value);
    if(validUsername == false) {
        window.alert("Username already exists");
        return;
    }

    // first name
    if(fname.value.trim() == "") {
        window.alert("First name cannot be empty");
        return;
    }

    // date of birth
    let validDob = validateDob(dob.value);
    if(validDob == false) {
        window.alert("User must be at least 20 years old");
        return;
    }

    // eid
    if(eid.value.trim() == "") {
        window.alert("eid cannot be empty");
        return;
    }

    let validEid = validateEid(eid.value);
    if(validEid == false) {
        window.alert("Invalid employee id");
        return;
    }

    // email
    if(email.value.trim() == "") {
        window.alert("email cannot be empty");
        return;
    }

    let validEmail = validateEmail(email.value);
    if(validEmail == false) {
        window.alert("Email already exists");
        return;
    }

    // phone
    if(phone.value.trim() == "") {
        window.alert("phone number cannot be empty");
        return;
    }

    let validPhone = validatePhone(phone.value);
    if(validPhone == false) {
        window.alert("Invalid phone number");
        return;
    }

    // clear the local storage
    window.localStorage.clear();

    // clear the session storage
    window.sessionStorage.clear();

    // delete the cookies
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    // add user to the session storage
    window.sessionStorage.setItem("username", username.value);
    window.sessionStorage.setItem("password", password.value);
    window.sessionStorage.setItem("profilePicture", base64Image);
    window.sessionStorage.setItem("firstName", fname.value);
    window.sessionStorage.setItem("lastName", lname.value);
    window.sessionStorage.setItem("designation", designation.value);
    window.sessionStorage.setItem("address", address.value);
    window.sessionStorage.setItem("phone", phone.value);
    window.sessionStorage.setItem("email", email.value);
    window.sessionStorage.setItem("link", link.value);
    window.sessionStorage.setItem("language", language.value);

    // redirect to the profile page
    window.location.assign("./profile.html");

});

const validateUsername = (username) => {
    for(let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.username == username) {
            return false;
        }
    }

    return true;
};


const validateDob = (dob) => {
    const date = new Date(dob);
    const today = new Date();

    let ageInYears = today.getFullYear() - date.getFullYear();

    return ageInYears >= 20;
}

const validateEid = (eid) => {
    for(let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.eid == eid) {
            return false;
        }
    }

    return true;
}

const validateEmail = (email) => {
    for(let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.email == email) {
            return false;
        }
    }

    return true;
}

const validatePhone = (phone) => {
    for(let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if(currentUser.phone == phone) {
            return false;
        }
    }

    return true;
}