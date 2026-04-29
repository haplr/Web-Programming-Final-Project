class App {
    constructor(){
        this.usernameInput = document.querySelector('#username');
        this.passwordInput = document.querySelector('#password');
        this.errorDiv = document.querySelector('#error-message');

        this.login = this.login.bind(this);

        document.querySelector('#login').addEventListener('submit', this.login);
    }

    async login(event){
        event.preventDefault();

        if(!this.usernameInput.value) { // if the username text input's value is "" (the user didn't enter a username)
            this.showError("Please enter a username");
            return;
        }

        if(!this.passwordInput.value) { // if the password text input's value is "" (the user didn't enter a password)
            this.showError("Please enter a password");
            return;
        }

        // if inputs are valid and we didn't return, then create a credentials object to send to the server
        const credentials = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        // send the credentials to the server and await the response 
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        // await the body of the response
        const auth = await response.json();

        // if the server responded with { success: true, message: "..." }, then the new user was created
        if (auth.success){
            window.location.href = 'account.html'; // update the page to account.html
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