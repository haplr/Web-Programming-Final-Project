class App {
    constructor(){
        this.firstNameInput = document.getElementById('first-name');
        this.lastNameInput = document.getElementById('last-name');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirm-password');
        this.errorDiv = document.getElementById('error-message');

        this.register = this.register.bind(this);

        document.querySelector('#login').addEventListener('submit', this.register);
    }

    async register(event){
        event.preventDefault();

        if(!this.firstNameInput.value) { // if the first name text input's value is "" (the user didn't enter a first name)
            this.showError("Please enter your first name");
            return;
        }

        if(!this.lastNameInput.value) { // if the last name text input's value is "" (the user didn't enter a last name)
            this.showError("Please enter your last name");
            return;
        }

        if(!this.usernameInput.value) { // if the username text input's value is "" (the user didn't enter a username)
            this.showError("Please enter a username");
            return;
        }

        if(!this.passwordInput.value) { // if the password text input's value is "" (the user didn't enter a password)
            this.showError("Please enter a password");
            return;
        }

        if(this.passwordInput.value != this.confirmPasswordInput.value) { // if the passwords do not match
            this.showError("Passwords don't match");
            return;
        }


        // if inputs are valid and we didn't return, then create a credentials object to send to the server
        const credentials = {
            username: this.usernameInput.value,
            password: this.passwordInput.value,
            firstName: this.firstNameInput.value,
            lastName: this.lastNameInput.value
        }
        
        // send the credentials to the server and await the response 
        const response = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        // await the body of the response (see the /register route in server.js)
        const auth = await response.json();

        // if the server responded with { success: true, message: "..." }, then the new user was created
        if (auth.success){
            window.location.href = 'login.html'; // update the page to login.html
        }
        else { // otherwise
            this.showError(auth.message); // show the error message div with the message received from the server
        }
    }

    showError(message){
        this.errorDiv.textContent = message;
        this.errorDiv.classList.remove('hidden');
    }
}

export default App;