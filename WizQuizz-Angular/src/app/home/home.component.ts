import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  loader: HTMLElement | null = null;

  async ngOnInit() {
    this.loader = document.querySelector('.loader');
    if (this.loader) {
      this.loader.classList.remove('loader-hidden');
    }

    try {
      const [whoData, newsData] = await Promise.all([
        this.loadJSON('assets/json/home/who_content.json'),
        this.loadJSON('assets/json/home/news_content.json')
      ]);

      this.renderContent(whoData.info, '.about-us-content');
      this.renderContent(newsData.news, '.news-content');

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
    console.log('Reading JSON');
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
  }

  renderContent(content: any[], containerSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let count_news = 0;
    content.forEach((item: any) => {
      const div = document.createElement('div');
      if (containerSelector === '.about-us-content') {
        div.classList.add('about-us-info', 'hidden');
        div.innerHTML = count_news % 2 === 0 ?
          `<img src="${item.image}" width="320" height="180" class="image" alt="">
           <p>${item.text}</p>` :
          `<p>${item.text}</p>
           <img src="${item.image}" width="320" height="180" class="image" alt="">`;
        count_news++;
      } else if (containerSelector === '.news-content') {
        div.classList.add('new');
        div.innerHTML = `<img src="${item.image}" width="560" height="315" alt="">
                         <div class="news-description">
                           <a href=""><h2>${item.headline}</h2></a>
                           <p>${item.description}</p>
                         </div>`;
      }
      container.appendChild(div);
    });
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
}
