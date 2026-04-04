let debounce;

async function getUsers() {
    const response = await fetch("data/account.json");
    const users = await response.json();
    return users;
}

async function login(inputUsername, inputPassword, errorDiv) {
    const users = await getUsers();
    
    if(users) {
        if(users.find(user => user.username === inputUsername && user.password === inputPassword)) {
            window.location.href = 'index.html';
        } else {
            clearTimeout(debounce);
            errorDiv.classList.remove("hidden");
            setTimeout(() => errorDiv.classList.add("hidden"), 3000);
        }
    }
}

const setup = () => {
    const button = document.querySelector("#login");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const errorDiv = document.querySelector("#error-message");

    document.querySelectorAll(".no-submit").forEach(t => t.addEventListener("submit", e=>{
        login(username.value, password.value, errorDiv);
        e.preventDefault();
    }));
    button.addEventListener("click", ()=>login(username.value, password.value, errorDiv));
}

export default setup;