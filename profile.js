const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileDesignation = document.getElementById("profile-designation");
const profileAddress = document.getElementById("profile-address");
const profilePhone = document.getElementById("profile-phone");
const profileEmail = document.getElementById("profile-email");
const profileLink = document.getElementById("profile-link");
const profileLanguage = document.getElementById("profile-language");

const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalDesignation = document.getElementById("modal-designation");
const modalAddress = document.getElementById("modal-address");
const modalPhone = document.getElementById("modal-phone");
const modalEmail = document.getElementById("modal-email");
const modalLink = document.getElementById("modal-link");
const modalLanguage = document.getElementById("modal-language");

document.addEventListener("DOMContentLoaded", () => {
    // check for the session storage
    if(window.sessionStorage.length > 2) {
        populateDataBasedOnSessionStorage();
        return;
    }

    // check for the existence of cookies
    let cookie = document.cookie;

    // if cookies are not found, that means no user is logged in. redirect to the sigin page
    if(cookie == "") {
        window.location.assign("./signin.html");
    }

    // cookies are found. stay on the profile page
    // populate the profile page and the modal with the data present in the local storage
    populateDataBasedOnLocalStorage();
});

const populateDataBasedOnLocalStorage = () => {
    const image = window.localStorage.getItem("profilePicture");
    const fname = window.localStorage.getItem("firstName");
    const lname = window.localStorage.getItem("lastName");
    const designation = window.localStorage.getItem("designation");
    const address = window.localStorage.getItem("address");
    const phone = window.localStorage.getItem("phone");
    const email = window.localStorage.getItem("email");
    const link = window.localStorage.getItem("link");
    const language = window.localStorage.getItem("language");
    
    if(image != "null") {
        profileImage.setAttribute("src", image);
        modalImage.setAttribute("src", image);
    }
    else {
        profileImage.setAttribute("src", "default-user.png");
        modalImage.setAttribute("src", "default-user.png");
    }

    profileName.textContent = fname + " " + lname;
    modalName.value = fname + " " + lname;

    profileDesignation.textContent = designation;
    modalDesignation.value = designation;

    profileAddress.textContent = address;
    modalAddress.value = address;

    profilePhone.textContent = phone;
    modalPhone.value = phone;

    profileEmail.textContent = email;
    modalEmail.value = email;

    profileLink.textContent = link;
    modalLink.value = link;

    profileLanguage.textContent = language;
    modalLanguage.value = language;
}

const populateDataBasedOnSessionStorage = () => {
    const image = window.sessionStorage.getItem("profilePicture");
    const fname = window.sessionStorage.getItem("firstName");
    const lname = window.sessionStorage.getItem("lastName");
    const designation = window.sessionStorage.getItem("designation");
    const address = window.sessionStorage.getItem("address");
    const phone = window.sessionStorage.getItem("phone");
    const email = window.sessionStorage.getItem("email");
    const link = window.sessionStorage.getItem("link");
    const language = window.sessionStorage.getItem("language");
    
    if(image != "null") {
        profileImage.setAttribute("src", image);
        modalImage.setAttribute("src", image);
    }
    else {
        profileImage.setAttribute("src", "default-user.png");
        modalImage.setAttribute("src", "default-user.png");
    }

    profileName.textContent = fname + " " + lname;
    modalName.value = fname + " " + lname;

    profileDesignation.textContent = designation;
    modalDesignation.value = designation;

    profileAddress.textContent = address;
    modalAddress.value = address;

    profilePhone.textContent = phone;
    modalPhone.value = phone;

    profileEmail.textContent = email;
    modalEmail.value = email;

    profileLink.textContent = link;
    modalLink.value = link;

    profileLanguage.textContent = language;
    modalLanguage.value = language;
}


// sign out button
const signout = document.getElementById("signout");

signout.addEventListener("click", () => {
    // clear the local storage
    window.localStorage.clear();

    // delete the cookies
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    // redirect to the signin page
    window.location.assign("./signin.html");
});


// image upload
const modalFile = document.getElementById("modal-file");
let base64Image = null;

modalFile.addEventListener("change", () => {
    const file = modalFile.files[0];
    if(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            modalImage.setAttribute("src", event.target.result);
            base64Image = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});


// save button
const save = document.getElementById("save");
save.addEventListener("click", () => {

    if(window.sessionStorage.length > 2) {
        window.sessionStorage.setItem("profilePicture", base64Image);
        window.sessionStorage.setItem("firstName", modalName.value);
        window.sessionStorage.setItem("lastName", "");
        window.sessionStorage.setItem("designation", modalDesignation.value);
        window.sessionStorage.setItem("address", modalAddress.value);
        window.sessionStorage.setItem("phone", modalPhone.value);
        window.sessionStorage.setItem("email", modalEmail.value);
        window.sessionStorage.setItem("link", modalLink.value);
        window.sessionStorage.setItem("language", modalLanguage.value);

        populateDataBasedOnSessionStorage();
        return;
    }


    window.localStorage.setItem("profilePicture", base64Image);
    window.localStorage.setItem("firstName", modalName.value);
    window.localStorage.setItem("lastName", "");
    window.localStorage.setItem("designation", modalDesignation.value);
    window.localStorage.setItem("address", modalAddress.value);
    window.localStorage.setItem("phone", modalPhone.value);
    window.localStorage.setItem("email", modalEmail.value);
    window.localStorage.setItem("link", modalLink.value);
    window.localStorage.setItem("language", modalLanguage.value);

    populateDataBasedOnLocalStorage();
});