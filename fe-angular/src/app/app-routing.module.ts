import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewArticleComponent } from './view-article/view-article.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {ListingArticlesComponent} from './listing-articles/listing-articles.component';

const routes: Routes = [
  { path: 'view-article', component: ViewArticleComponent },
  { path: 'create-article', component: CreateArticleComponent },
  { path: '', component: ListingArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
