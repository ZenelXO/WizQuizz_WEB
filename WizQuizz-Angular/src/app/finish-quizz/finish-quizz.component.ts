import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-quizz',
  templateUrl: './finish-quizz.component.html',
  styleUrl: './finish-quizz.component.css'
})
export class FinishQuizzComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    window.addEventListener("load", () => {
      const loader = document.querySelector(".loader") as HTMLElement;

      if (loader) {
        loader.classList.add("loader-hidden");
        loader.addEventListener("transitionend", () => {
          if (document.body.contains(loader)) {
            document.body.removeChild(loader);
          }
        });
      }
    });

    document.addEventListener('DOMContentLoaded', async () => {
      const menuIcon = document.querySelector('.mobile-bars') as HTMLElement;
      const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;

      menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('show-menu');
      });

      const finish = document.getElementById("finish");
      const mark = document.getElementById("mark");
      const resultado = localStorage.getItem("results");
      const numofquestions = localStorage.getItem("numofquestions");
      let varInteger: number;
        if (numofquestions !== null) {
          varInteger = parseInt(numofquestions);
        } else {
          varInteger = 0;
        }

            if (resultado && parseInt(resultado) >= varInteger / 2) {
              if(mark) mark.innerHTML = resultado + "/" + numofquestions;
            } else {
              if(mark) mark.innerHTML = resultado + "/" + numofquestions;
            }

            if (resultado === "1") {
              if(finish) finish.innerHTML = "Congratulations!";
            } else {
              if(finish) finish.innerHTML = "Bad Luck!";
            }
            if (resultado === null) {
              console.log("sisisisisi")
              if(mark) mark.innerHTML = "0/0";
            }
            localStorage.clear();
    });
  }
}
