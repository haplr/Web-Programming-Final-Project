class App {
    // Setup constructor for the login page.
    constructor() {
        const username = document.querySelector("#username");
        const password = document.querySelector("#password");
        this.errorDiv = document.querySelector("#error-message");
        this.debounce;

        document.querySelector("#login").addEventListener("submit", e=>this.login(e, username.value, password.value));
    }

    // Checks if the user and password pairing exists in the account.json file
    // if so the user is brought to the home page
    // otherwise they are briefly shown a error for 3 seconds.
    async login(e, inputUsername, inputPassword) {
        e.preventDefault();
        const users = await this.getUsers();
    
        if(users) {
            if(users.find(user => user.username === inputUsername && user.password === inputPassword)) {
                window.location.href = 'index.html';
            } else {
                clearTimeout(this.debounce);
                this.errorDiv.classList.remove("hidden");
                setTimeout(() => this.errorDiv.classList.add("hidden"), 3000);
            }
        }
    }

    // Fetch and return users account data from account.json file
    async getUsers() {
        const response = await fetch("data/account.json");
        const users = await response.json();
        return users;
    }
}

export default App;