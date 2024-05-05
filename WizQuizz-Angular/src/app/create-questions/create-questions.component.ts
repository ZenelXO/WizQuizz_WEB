import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})

export class CreateQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const menuIcon: HTMLElement | null = document.querySelector('.mobile-bars');
    const mobileMenu: HTMLElement | null = document.querySelector('.mobile-menu');

    if (menuIcon && mobileMenu) {
      menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('show-menu');
      });
    }

    // Create Question
    const submitButton: HTMLElement | null = document.getElementById("submit");
    if (submitButton) {
      submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores del formulario
        const title: string = (document.getElementById("questionTittle") as HTMLInputElement).value;
        const answer1: string = (document.getElementById("answer1") as HTMLInputElement).value;
        const answer2: string = (document.getElementById("answer2") as HTMLInputElement).value;
        const answer3: string = (document.getElementById("answer3") as HTMLInputElement).value;
        const answer4: string = (document.getElementById("answer4") as HTMLInputElement).value;

        // Crear un objeto JSON con los datos
        const data = {
          "questionTittle": title,
          "answer1": answer1,
          "answer2": answer2,
          "answer3": answer3,
          "answer4": answer4
        };

        // Convertir el objeto JSON a una cadena JSON
        const jsonData: string = JSON.stringify(data);

        // Aquí puedes enviar jsonData a tu servidor o realizar cualquier otra operación con él
        localStorage.setItem("questionsInfo", jsonData);
        const localCloudQuestions: string | null = localStorage.getItem("questionsInfo");
      });
    }
  }
}