async function getUsers() {
    const response = await fetch("data/account.json");
    const users = await response.json();
    
    return users;
}

async function login(inputUsername, inputPassword, errorDiv) {
    const users = await getUsers();
    
    if(users)
    {
        if(users.find(user => user.username === inputUsername && user.password === inputPassword)) {
            window.location.href = 'index.html';
        } else {
            const errorDiv = document.querySelector("#error-message");
            errorDiv.classList.remove("hidden");
        }
    }
}

const setup = () => {
    const button = document.querySelector(".login-button");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const errorDiv = document.querySelector("#error-message");
    
    button.addEventListener("click", () => {
            login(username.value, password.value, errorDiv);
    });
}

export default setup;