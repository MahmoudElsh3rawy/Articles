import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css', '../app.component.css'],
})
export class CreateArticleComponent implements OnInit{

  articleForm : FormGroup;
  pageTitle: any;
  articleId: any;
  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router) {
    this.articleForm = new FormGroup({
      articleTitle: new FormControl('', Validators.required),
      publisherName: new FormControl('', Validators.required),
      articleContent: new FormControl('', Validators.required),
      articleStatus: new FormControl('', Validators.required),
    });
    this.pageTitle = "Create Article";    
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    this.appService
      .addArticle(this.articleForm.value, this.articleId)
      .subscribe((data) => {
        this.router.navigate([`/`]);
      });
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe( params => {
      const articleId = params['articleId'];
      if (articleId != undefined && articleId != null){
        this.pageTitle = "Edit Article";
        this.articleId = articleId;
        this.appService
        .getArticle(articleId)
        .subscribe((article: any) => {
          
          this.articleForm = new FormGroup({
            articleTitle: new FormControl(article[0].article_title, Validators.required),
            publisherName: new FormControl(article[0].publisher_name, Validators.required),
            articleContent: new FormControl(article[0].article_content, Validators.required),
            articleStatus: new FormControl(article[0].article_status, Validators.required),
          });
        });
      }
      
    })
  }
}
