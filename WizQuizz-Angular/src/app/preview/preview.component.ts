import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})

export class PreviewComponent implements OnInit {
  @ViewChild('preview', { static: true }) previewElement!: ElementRef;
  @ViewChild('questions', { static: true }) questionsElement!: ElementRef;

  previewData: any = { preview: [] };
  questionsData: any = { questions: [] };

  ngOnInit() {
    this.loadJSON('assets/json/preview/quizz-preview.json').then(data => {
      this.previewData = data;
      this.questionsData = data;
    }).catch(error => {
      console.error('Error loading filters JSON data:', error);
    });

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
      let previewInView = false;
      let questionsInView = false;

      entries.forEach(entry => {
        if (entry.target === this.previewElement.nativeElement && entry.isIntersecting) {
          previewInView = true;
        }

        if (entry.target === this.questionsElement.nativeElement && entry.isIntersecting) {
          questionsInView = true;
        }
      });

      if (previewInView) {
        this.previewElement.nativeElement.classList.add('show');
      }

      if (questionsInView) {
        this.questionsElement.nativeElement.classList.add('show');
      }

      if (previewInView && questionsInView) {
        observer.disconnect();
      }
    }, options);

    observer.observe(this.previewElement.nativeElement);
    observer.observe(this.questionsElement.nativeElement);
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
