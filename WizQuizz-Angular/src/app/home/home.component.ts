import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('aboutUs', { static: true }) aboutUsElement!: ElementRef;
  @ViewChild('news', { static: true }) newsElement!: ElementRef;
  @ViewChild('newsContent', { static: true }) newsContentElement!: ElementRef;

  whoData: any[] = [];
  newsData: any[] = [];

  ngOnInit(): void {
    this.loadJSON('assets/json/home/who_content.json').then(data => {
      this.whoData = data.info;
    }).catch(error => {
      console.error('Error loading WHO data:', error);
    });

    this.loadJSON('assets/json/home/news_content.json').then(data => {
      this.newsData = data.news;
    }).catch(error => {
      console.error('Error loading news data:', error);
    });

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
      let aboutUsInView = false;
      let newsInView = false;
      let newsContentInView = false;

      entries.forEach(entry => {
        if (entry.target === this.aboutUsElement.nativeElement && entry.isIntersecting) {
          aboutUsInView = true;
        }

        if (entry.target === this.newsElement.nativeElement && entry.isIntersecting) {
          newsInView = true;
        }

        if (entry.target === this.newsContentElement.nativeElement && entry.isIntersecting) {
          newsContentInView = true;
        }
      });

      if (aboutUsInView) {
        this.aboutUsElement.nativeElement.classList.add('show');
      }

      if (newsInView) {
        this.newsElement.nativeElement.classList.add('show');
      }

      if (newsContentInView) {
        this.newsContentElement.nativeElement.classList.add('show');
      }

      if (aboutUsInView && newsInView && newsContentInView) {
        observer.disconnect();
      }
    }, options);

    observer.observe(this.aboutUsElement.nativeElement);
    observer.observe(this.newsElement.nativeElement);
    observer.observe(this.newsContentElement.nativeElement);
  }

  async loadJSON(file: string) {
    console.log('Reading JSON');
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
  }
}
