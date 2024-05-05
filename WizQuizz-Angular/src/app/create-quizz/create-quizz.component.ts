import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrl: './create-quizz.component.css'
})

export class CreateQuizzComponent{

  constructor(private router: Router) { }

  ngOnInit(): void {
    const menuIcon: HTMLElement | null = document.querySelector('.mobile-bars');
    const mobileMenu: HTMLElement | null = document.querySelector('.mobile-menu');

    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener('click', function () {
            mobileMenu.classList.toggle('show-menu');
        });
    }

    const localCloudQuestions: string | null = localStorage.getItem("questionsInfo");
    if (localCloudQuestions === null || localCloudQuestions.length === 0) {
        const goat = document.getElementById("goat");
        if (goat) goat.style.display = "none";
    } else {
        const goat: HTMLElement | null = document.getElementById("goat");
        const goat2: HTMLElement | null = document.getElementById("goat2");
        if (goat && goat2) {
            goat.style.display = "block";
            goat2.style.display = "none";

            const parsedData: { questionTittle: string, answer1: string, answer2: string, answer3: string, answer4: string } = JSON.parse(localCloudQuestions);
            const { questionTittle, answer1, answer2, answer3, answer4 } = parsedData;

            document.getElementById("questionTitleJS")!.innerHTML = questionTittle;
            document.getElementById("answer1JS")!.innerHTML = answer1;
            document.getElementById("answer2JS")!.innerHTML = answer2;
            document.getElementById("answer3JS")!.innerHTML = answer3;
            document.getElementById("answer4JS")!.innerHTML = answer4;
        }
    }

    const finishButton: HTMLElement | null = document.getElementById("finish");
    if (finishButton) {
      finishButton.addEventListener("click", () => {
        localStorage.clear();
        this.router.navigate(['']);
      });
    }
  }

  onSubmit(): void {
      // Obtener los valores del formulario
      const titulo: string = (document.getElementById("titulo") as HTMLInputElement).value;
      const littledescription: string = (document.getElementById("littledescription") as HTMLInputElement).value;

      // Crear un objeto JSON con los datos
      const data: { titulo: string, littledescription: string } = {
          "titulo": titulo,
          "littledescription": littledescription
      };

      // Convertir el objeto JSON a una cadena JSON
      const jsonData: string = JSON.stringify(data);

      // Aquí puedes enviar jsonData a tu servidor o realizar cualquier otra operación con él
      localStorage.setItem("quizzInfo", jsonData);
      const localCloudQuizz: string | null = localStorage.getItem("quizzInfo");
      if (localCloudQuizz) {
          document.getElementById("titulo")!.innerHTML = titulo;
          document.getElementById("littledescription")!.innerHTML = littledescription;

          // PRUEBAS
          document.getElementById("prueba")!.innerHTML = localCloudQuizz;
      }
  }
}