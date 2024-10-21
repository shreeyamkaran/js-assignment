import users from "./users.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
const btn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    // check the existence of cookies
    const cookie = document.cookie;

    // if cookies are not found, simply return and load the signin page
    if(cookie == "") {
        return;
    }

    // cookies are found, redirect to the profile page
    window.location.assign("./profile.html");
});

btn.addEventListener("click", () => {

    if(username.value.toString().trim() == "" || password.value.toString().trim() == "") {
        window.alert("All fields are required");
        return;
    }

    let temporaryUser = findUserFromSessionStorage(username.value, password.value);
    console.log(temporaryUser);
    
    
    if(temporaryUser != "null") {
        // user is coming from the session storage
        // simply redirect to the profile page
        // without creating cookies and saving user details to the local storage
        window.location.assign("./profile.html");
        return;
    }
    else {
        window.sessionStorage.clear();
    }

    let user = findUser(username.value, password.value);
    
    if(user == null) {
        window.alert("Invalid credentials");
        return;
    }

    // save the user in the local storage
    Object.keys(user).forEach(key => {
        window.localStorage.setItem(`${key}`, `${user[key]}`);
    });

    // create cookie
    const date = new Date();
    const days = (checkbox.checked ? 30 : 1);
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = date.toUTCString();
    document.cookie = "username=" + username.value + ";expires=" + expires + ";path=/;";

    // redirect to the profile page
    window.location.assign("./profile.html");
});

const findUser = (username, password) => {
    for(let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.password == password) {
            if(user.username == username || user.phone == username || user.email == username) {
                return user;
            }
        }
    }

    return null;
}

const findUserFromSessionStorage = (username, password) => {
    
    const ss_username = window.sessionStorage.getItem("username");
    const ss_email = window.sessionStorage.getItem("email");
    const ss_phone = window.sessionStorage.getItem("phone");
    const ss_password = window.sessionStorage.getItem("password");

    if(password == ss_password) {
        if(username == ss_username || username == ss_email || username == ss_phone) {
            // return a not null value
            return "string";
        }
    }

    return "null";

}