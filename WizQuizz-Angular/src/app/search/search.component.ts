import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {
  loader: HTMLElement | null = null;

  async ngOnInit() {
    this.loader = document.querySelector(".loader");
    if (this.loader) {
      this.loader.classList.add("loader-hidden");
      this.loader.addEventListener("transitionend", () => {
        if (this.loader) {
          document.body.removeChild(this.loader);
        }
      });
    }

    try {
      const [filtersData, quizzData] = await Promise.all([
        this.loadJSON('assets/json/search/filters_content.json'),
        this.loadJSON('assets/json/search/quizz_content.json')
      ]);

      this.renderContent(filtersData.filters, 'aside');
      this.renderContent(quizzData.quizz, '.quizz-selection');

      const hiddenElements = document.querySelectorAll('.hidden');
      hiddenElements.forEach((el) => this.observer.observe(el));
    } catch (error) {
      console.error('Error loading JSON data:', error);
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
      const div = document.createElement('div');
      if (containerSelector === 'aside') {
        div.classList.add('filter');
        div.innerHTML = `<span><img src="${item.icon}" alt="NavIcon" width="64" height="64"></span>
                         <span>${item.text}</span>`;
      } else if (containerSelector === '.quizz-selection') {
        div.classList.add('quizz');
        div.classList.add('hidden');
        div.innerHTML = `<a href="">
                            <img src="${item.image}" width="400" height="225" class="image">
                            <h2>${item.title}</h2>
                            </a>`;
      }
      container.appendChild(div);
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
