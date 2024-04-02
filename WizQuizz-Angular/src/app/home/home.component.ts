import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

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

      const [whoData, newsData] = await Promise.all([
        loadJSON({file: 'assets/jsons/home/who_content.json'}),
        loadJSON({file: 'assets/jsons/home/news_content.json'})
      ]);

      renderContent({content: whoData.info, containerSelector: '.about-us-content'});
      renderContent({content: newsData.news, containerSelector: '.news-content'});

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
      let count_news = 0;
      content.forEach((item: any) => {
        const div = document.createElement('div');
        if (containerSelector === '.about-us-content') {
          div.classList.add('about-us-info');
          div.classList.add('hidden');
          if (count_news % 2 === 0) {
            div.innerHTML = `<img src="${item.image}" width="320" height="180" class="image" alt="">
                                <p>${item.text}</p>`;
            count_news++;
          } else {
            div.innerHTML = `<p>${item.text}</p>
                                <img src="${item.image}" width="320" height="180" class="image" alt="">`;
            count_news++;
          }
        } else if (containerSelector === '.news-content') {
          div.classList.add('new');
          div.innerHTML = `<img src="${item.image}" width="560" height="315" alt=""></a>
                             <div class="news-description"><a href=""><h2>${item.headline}</h2></a>
                             <p>${item.description}</p></div>`;
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
