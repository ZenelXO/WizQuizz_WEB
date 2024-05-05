import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.css'
})
export class InGameComponent implements OnInit{
  constructor(private router : Router) { }

  ngOnInit(): void {
    const music = new Audio('../../assets/website-audio/play/in-game/in-game.mp3');
    const correct = new Audio('../../assets/website-audio/play/in-game/correct-answer.mp3');
    const incorrect = new Audio('../../assets/website-audio/play/in-game/incorrect-answer.mp3');

    window.onload = () => {
      music.play();
      

      window.addEventListener('focus', () => {
        music.play();
      });

      window.addEventListener('blur', () => {
        music.pause();
      });
      music.loop = true;
      music.volume = 0.4;
      fadeOutAudio(music, 129000);
    };

    function fadeOutAudio(audio: any, duration: any) {
      const intervalDuration = 50;
      const steps = duration / intervalDuration;
      const stepSize = audio.volume / steps;

      const fadeOutInterval = setInterval(() => {
        audio.volume -= stepSize;
        if (audio.volume <= 0) {
          audio.pause();
          clearInterval(fadeOutInterval);
        }
      }, intervalDuration);
    }

    document.addEventListener('DOMContentLoaded', () => {
      const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answers button:not(.next-question)');
      const correctButton = document.getElementById("correct-answer");
      const nextQuestion = document.getElementById("next-question");
      let results = 0;
      let numofquestions = 0;

      function increaseNumOfQuestions() {
        numofquestions++;
        localStorage.setItem("numofquestions", numofquestions.toString());
      }

      (document.querySelectorAll('.answers button:not(.next-question)') as NodeListOf<HTMLButtonElement>).forEach(button => {
        button.style.transition = 'background-color 2s ease';
      });

      buttons.forEach(button => {
        button.addEventListener('click', (event: Event) => {
          if ((event.target as HTMLButtonElement).disabled) {
            return;
          }

          buttons.forEach((btn: HTMLButtonElement) => {
            if (btn !== button && btn !== correctButton) {
                btn.style.opacity = '0.5';
            }
            btn.disabled = true;
        });

          if (button === correctButton) {
            correctButton.style.backgroundColor = '#28fc64';
            music.volume = 0.1;
            correct.volume = 0.9;
            fadeOutAudio(correct, 3000);
            correct.play().then(r => fadeOutAudio(incorrect, 3000));
            results++;
          } else {
            if (correctButton) {
              correctButton.style.backgroundColor = '#28fc64';
            }
            button.style.backgroundColor = '#FF3333';
            music.volume = 0.1;
            incorrect.volume = 0.9;
            incorrect.play().then(r => fadeOutAudio(incorrect, 3000));
          }
          increaseNumOfQuestions();
          localStorage.setItem("results", results.toString());
        });
      });
        if(nextQuestion) nextQuestion.addEventListener("click", (event: Event) => {
        event.preventDefault();
        this.router.navigate(['/quizz-finish']);
      });
    });
  }
}