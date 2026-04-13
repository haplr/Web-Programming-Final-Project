class App {
    // Setup constructor for the register page
    constructor() {
        const username = document.querySelector("#username");
        const password = document.querySelector("#password");
        const confirm_password = document.querySelector("#confirm-password");
        this.errorDiv = document.querySelector("#error-message");
        this.debounce;

        document.querySelector("#register").addEventListener("submit", e=>this.register(e, username.value, password.value, confirm_password.value));
    }

    // Checks if the user and password is valid
    // if so the user is brought to the login page
    // otherwise they are briefly shown a error for 3 seconds.
    async register(e, inputUsername, inputPassword, inputConfirmedPassword) {
        e.preventDefault();
        clearTimeout(this.debounce);

        if(!await this.valid_username(inputUsername) || !this.valid_password(inputPassword, inputConfirmedPassword)) {
            this.errorDiv.classList.remove("hidden");
            this.debounce = setTimeout(() => {this.errorDiv.classList.add("hidden")}, 3000);
            return;
        }

        const users = await this.getUsers();

        // TODO: Add registration info to database

        window.location.href = "login.html";
    }

    // Return whether or not the username is vaild
    // Validity is based on whether the username isn't in the account.json file and isn't blank
    // If it is not valid the errorDiv text is updated
    async valid_username(inputUsername) {
        if(inputUsername === "") {
            this.errorDiv.textContent = "Please enter a username.";
            return false;
        }

        for(const user of await this.getUsers()) {
            if(inputUsername === user.username) {
                this.errorDiv.textContent = "Username already exists.";
                return false;
            }
        }

        return true;
    }

    // Return whether or not the password is vaild
    // Validity is based on whether the password and confirmPassword match and isn't blank
    // If it is not valid the errorDiv text is updated
    valid_password(inputPassword, inputConfirmedPassword) {
        if(inputPassword === "") {
            this.errorDiv.textContent = "Please enter a password.";
            return false;
        }

        if(inputPassword !== inputConfirmedPassword) {
            this.errorDiv.textContent = "Passwords do not match";
            return false;
        }

        return true;
    }

    // Fetch and return users account data from account.json file
    async getUsers() {
        const response = await fetch("data/account.json");
        const users = await response.json();
        return users;
    }
}

export default App;