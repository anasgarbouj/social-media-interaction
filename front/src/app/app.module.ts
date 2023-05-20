import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RightComponent } from './right/right.component';
import { LeftComponent } from './left/left.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScoreComponent } from './score/score.component';
import { CoverComponent } from './cover/cover.component';
import { AppRoutingModule } from './app-routing.module';
import { ClassComponent } from './class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    PostsComponent,
    RightComponent,
    LeftComponent,
    FooterComponent,
    ScoreComponent,
    CoverComponent,
    ClassComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
