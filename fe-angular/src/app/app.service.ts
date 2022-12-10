import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  rootURL = '/api';


  getArticle(articleId: any) {
    let queryparams = new HttpParams().append("articleId",articleId)
    return this.http.get<any>(this.rootURL + '/article', { params: queryparams });
  }

  getArticles() {
    return this.http.get<any[]>(this.rootURL + '/allarticles');
  }

  addArticle(article: any, articleId: any) {
    if (articleId != null){
      article['articleId'] = articleId;
    }
    
    return this.http.post(this.rootURL + '/article', { article });
  }

  deleteArticle(articleId: any){
    return this.http.post(this.rootURL + '/deletearticle', { articleId });
  }

}
