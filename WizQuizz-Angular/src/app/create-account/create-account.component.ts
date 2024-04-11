import { Component } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  loader: HTMLElement | null = null;

  async ngOnInit() {
    this.loader = document.querySelector('.loader');
    if (this.loader) {
      this.loader.classList.remove('loader-hidden');
    }

    let usersData;

    try {
        const response = await fetch("../../data/login/users.json");
        usersData = await response.json();
    } catch (error) {
        console.error("Error al cargar los datos de los usuarios:", error);
        return;
    }

    const passwordInput = document.getElementById('password-input');
    passwordInput.addEventListener('input', function(evt) {
        let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
        if (passwordInput.value.length < 8){
            passwordInput.setCustomValidity("Password must be at least 8 characters");
        } else if (!specialChars.test(passwordInput.value)){
            passwordInput.setCustomValidity("Password must contain at least 1 special character");
        }
        else {
            passwordInput.setCustomValidity("");
        }
    });

    const confpasswordInput = document.getElementById('confirm-password-input');
    confpasswordInput.addEventListener('input', function(evt) {
        let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
        if (confpasswordInput.value.length < 8){
            confpasswordInput.setCustomValidity("Password must be at least 8 characters");
        } else if (!specialChars.test(confpasswordInput.value)){
            confpasswordInput.setCustomValidity("Password must contain at least 1 special character");
        } else if (!(confpasswordInput.value === passwordInput.value)){
            confpasswordInput.setCustomValidity("Passwords must match");
        }
        else {
            confpasswordInput.setCustomValidity("");
        }
    });

    const usernameInput = document.getElementById('nickname-input');
    usernameInput.addEventListener('input', function(evt) {
        if (usernameInput.value.length < 5){
            usernameInput.setCustomValidity("Username must be at least 5 characters");
        } else {
            usernameInput.setCustomValidity("");
        }
    });

    const createAccountForm = document.getElementById('inputs'); // Cambia esto para apuntar al formulario
    createAccountForm.addEventListener('submit', async function(e) { // Cambia 'createAccountButton' por 'createAccountForm'
        e.preventDefault(); // Evita que la página se recargue

        // Deshabilitar temporalmente el botón para evitar múltiples clics
        const createAccountButton = document.getElementById("create-account-button");
        createAccountButton.disabled = true;

        var username = document.getElementById("nickname-input").value.trim();
        var email = document.getElementById('email-input').value.trim();
        var password = document.getElementById('password-input').value.trim();
        const description = "In the annals of magic, there exists a whispered legend of a wizard unparalleled: Zephyrion, the Arcane Sovereign. With robes swirling like tempests, he wields spells of unfathomable power. From ancient tomes, he conjures storms of brilliance, shaping reality itself. His name resonates through time as a beacon of mystic mastery.";
        var confirmPassword = document.getElementById('confirm-password-input').value.trim();

        console.log("antes del fetch");

        usersData.forEach(user => {
            if(user.nickname === username){
                alert("El nombre de usuario: \"" + username + "\" se encuentra en uso, por favor seleccione uno difetente.");
                return;
            }
            if(user.email === email){
                alert("El correo: \"" + email + "\" se encuentra en uso, por favor seleccione uno difetente.");
                return;
            }
        });

        if (password === confirmPassword) {
            sessionStorage.setItem("actualUser", username);
            sessionStorage.setItem("userMail", email);
            try {
                console.log("user saved");
            } catch (error) {
                alert("Error al obtener usuarios:", error);
                return;
            }
        } else {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const finalUser = {
            nickname: username,
            email: email,
            password: password,
            description: description
        }
        usersData.push(finalUser);
        console.log(usersData);

        //await saveJSON(usersData);

        alert("usuario creado correctamente");
        console.log(finalUser);
        const frm = document.getElementById("inputs");
        frm.reset();
    });
};
  
}


