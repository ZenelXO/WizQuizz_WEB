import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {
  loader: HTMLElement | null = null;

  async ngOnInit() {
    this.loader = document.querySelector('.loader');
    if (this.loader) {
      this.loader.classList.remove('loader-hidden');
    }

    try {
      const previewData = await this.loadJSON('assets/json/preview/quizz-preview.json');

      this.renderContent(previewData.preview, '.preview');
      this.renderContent(previewData.questions, '.quizz-questions');

      const hiddenElements = document.querySelectorAll('.hidden');
      hiddenElements.forEach((el) => this.observer.observe(el));
    } catch (error) {
      console.error('Error loading JSON data:', error);
    } finally {
      setTimeout(() => {
        if (this.loader) {
          this.loader.classList.add('loader-hidden');
        }
      }, 500);
    }
  }

  async loadJSON(file: string) {
    console.log("Reading JSON");
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
  }

  renderContent(content: any[], containerSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    content.forEach((item: any) => {
      const section = document.createElement('section');
      const aux_section = document.createElement('section');

      if (containerSelector === '.preview') {
        section.classList.add('quizz-info');
        section.innerHTML = `<img src="${item.image}" width="560" height="315">
                     <div class="quizz-lower-info">
                         <div class="additional-info">
                             <p>${item.author}</p>
                             <p>${item.submit_date}</p>
                         </div>
                         <a routerLink="/"><input class="quizz-start-button" type="button" value="START GAME"></a>
                     </div>`;

        aux_section.classList.add('quizz-description');
        aux_section.innerHTML = `<h1>${item.title}</h1>
                                <p>${item.description}</p>`;
      } else if (containerSelector === '.quizz-questions') {
        section.classList.add('question');
        section.classList.add('hidden');
        let answersHTML = '';
        item.answers.forEach((answer: any) => {
          answersHTML += `<button class="${answer.icon_name}-button"><span><img src="${answer.image}"></span><span>${answer.text}</span></button>`;
        });
        section.innerHTML = `<div class="question-info">
                         <p>${item.question_text}</p>
                         <div class="num-of-question">
                             <h2>${item.question_number}</h2>
                         </div>
                     </div>
                     <div class="answers">${answersHTML}</div>`;
      }
      container.appendChild(section);
      container.appendChild(aux_section);
    });
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
}
