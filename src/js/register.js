let debounce;

// Fetch and return users account data from account.json file
async function getUsers() {
    const response = await fetch("data/account.json");
    const users = await response.json();
    return users;
}

// Checks if the user and password is valid
// if so the user is brought to the login page
// otherwise they are briefly shown a error for 3 seconds.
async function register(inputUsername, inputPassword, inputConfirmedPassword, errorDiv) {
    clearTimeout(debounce);

    if(!await valid_username(inputUsername, errorDiv) || !valid_password(inputPassword, inputConfirmedPassword, errorDiv)) {
        errorDiv.classList.remove("hidden");
        debounce = setTimeout(() => {errorDiv.classList.add("hidden")}, 3000);
        return;
    }

    const users = await getUsers();

    // TODO: Add registration info to database

    window.location.href = "login.html";
}

// Return whether or not the username is vaild
// Validity is based on whether the username isn't in the account.json file and isn't blank
// If it is not valid the errorDiv text is updated
async function valid_username(inputUsername, errorDiv) {
    if(inputUsername === "") {
        errorDiv.textContent = "Please enter a username.";
        return false;
    }

    for(const user of await getUsers()) {
        if(inputUsername === user.username) {
            errorDiv.textContent = "Username already exists.";
            return false;
        }
    }

    return true;
}

// Return whether or not the password is vaild
// Validity is based on whether the password and confirmPassword match and isn't blank
// If it is not valid the errorDiv text is updated
function valid_password(inputPassword, inputConfirmedPassword, errorDiv) {
    if(inputPassword === "") {
        errorDiv.textContent = "Please enter a password.";
        return false;
    }

    if(inputPassword !== inputConfirmedPassword) {
        errorDiv.textContent = "Passwords do not match";
        return false;
    }

    return true;
}

// Setup function for the register page
const setup = () => {
    const button = document.querySelector("#register");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const confirm_password = document.querySelector("#confirm-password");
    const errorDiv = document.querySelector("#error-message");

    document.querySelectorAll(".no-submit").forEach(t => t.addEventListener("submit", e=>{
        register(username.value, password.value, confirm_password.value, errorDiv);
        e.preventDefault();
    }));

    button.addEventListener("click", ()=>register(username.value, password.value, confirm_password.value, errorDiv));
}

export default setup;