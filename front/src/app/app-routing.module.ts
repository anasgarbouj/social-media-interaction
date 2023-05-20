import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule , Routes} from '@angular/router'
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { CoverComponent } from './cover/cover.component';
const routes : Routes =[
{path:'users',component:UsersComponent},
{path:'posts',component:PostsComponent},
{path:'cover',component:CoverComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
