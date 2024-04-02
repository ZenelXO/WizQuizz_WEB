import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConsoleLogger} from "@angular/compiler-cli";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {
  loader: HTMLElement | null = null;

  ngOnInit() {
    window.addEventListener("load", () => {
      this.loader = document.querySelector(".loader");
      if (this.loader) {
        this.loader.classList.add("loader-hidden");
        this.loader.addEventListener("transitionend", () => {
          if (this.loader) {
            document.body.removeChild(this.loader);
          }
        });
      }
    });

    document.addEventListener('DOMContentLoaded', async () => {

      const [filtersData, quizzData] = await Promise.all([
        loadJSON({file: 'assets/jsons/play/filters_content.json'}),
        loadJSON({file: 'assets/jsons/play/quizz_content.json'})
      ]);

      renderContent({content: filtersData.filters, containerSelector: 'aside'});
      renderContent({content: quizzData.quizz, containerSelector: '.quizz-selection'});

      const hiddenElements = document.querySelectorAll('.hidden');
      hiddenElements.forEach((el) => observer.observe(el));
    });

    async function loadJSON({file}: { file: any }) {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
      }
      return response.json();
    }

    function renderContent({content, containerSelector}: { content: any, containerSelector: any }) {
      const container = document.querySelector(containerSelector);
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
          console.log("se ejecutó");
        }
        container.appendChild(div);
      });
    }

    const observer = new IntersectionObserver(entries => {
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
}
