import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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
  }

  async loadJSON(file: string) {
    console.log("Reading JSON");
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
  }

  observeIntersection(event: any) {
    if (event.isIntersecting) {
      event.target.classList.add('show');
    } else {
      event.target.classList.remove('show');
    }
  }
}
