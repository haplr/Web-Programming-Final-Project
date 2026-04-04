let debounce;

async function getUsers() {
    const response = await fetch("data/account.json");
    const users = await response.json();
    return users;
}

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