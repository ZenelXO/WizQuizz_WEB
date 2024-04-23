import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild('filters', { static: true }) filtersElement!: ElementRef;
  @ViewChild('quizzes', { static: true }) quizzesElement!: ElementRef;

  filtersData: any = { filters: [] };
  quizzData: any = { quizz: [] };

  ngOnInit() {
    this.loadJSON('assets/json/search/filters_content.json').then(data => {
      this.filtersData = data;
    }).catch(error => {
      console.error('Error loading filters JSON data:', error);
    });

    this.loadJSON('assets/json/search/quizz_content.json').then(data => {
      this.quizzData = data;
    }).catch(error => {
      console.error('Error loading quizz JSON data:', error);
    });

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
      let quizzesInView = false;
      let filtersInView = false;

      entries.forEach(entry => {
        if (entry.target === this.quizzesElement.nativeElement && entry.isIntersecting) {
          quizzesInView = true;
        }

        if (entry.target === this.filtersElement.nativeElement && entry.isIntersecting) {
          filtersInView = true;
        }
      });

      if (quizzesInView && filtersInView) {
        this.quizzesElement.nativeElement.classList.add('show');
        this.filtersElement.nativeElement.classList.add('show');
        observer.disconnect();
      }
    }, options);

    observer.observe(this.quizzesElement.nativeElement);
    observer.observe(this.filtersElement.nativeElement);
  }

  async loadJSON(file: string) {
    console.log("Reading JSON");
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
  }
}
