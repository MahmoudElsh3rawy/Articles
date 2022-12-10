import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-listing-articles',
  templateUrl: './listing-articles.component.html',
  styleUrls: ['./listing-articles.component.css'],
})
export class ListingArticlesComponent implements OnInit{
  allArticles: any[];
  
  constructor(private appService: AppService, private router: Router){
    this.allArticles = []
  }
  onCreateArticle(){
    this.router.navigate([`/create-article`]);
  }
  onClickView(articleId: any){
    this.router.navigate(["/view-article"], { queryParams: { articleId: articleId } });
  }
  onClickDelete(articleId: any){
    this.appService
      .deleteArticle(articleId)
      .subscribe((data) => {
        window.location.reload();
      });
  }
  ngOnInit() {
    this.appService
        .getArticles()
        .subscribe((articles: any[]) => {
          this.allArticles = articles;
        });
  }

  
}
