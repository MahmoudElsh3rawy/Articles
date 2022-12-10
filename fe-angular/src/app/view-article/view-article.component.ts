import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit{

  @Input() article = { article_content : "",
      article_status : "",
      article_title : "",
      publisher_name : "",
      updated_at: ""};
  articleId: any;
  
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
    ){}

  onClickEdit(){
    this.router.navigate(["/create-article"], { queryParams: { articleId: this.articleId } });
  }
  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.articleId = params['articleId'];
      this.appService
      .getArticle(this.articleId)
      .subscribe((article: any) => {
        this.article = article[0];
      });
    })
  }
}
