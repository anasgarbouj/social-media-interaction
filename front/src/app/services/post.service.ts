import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post , Comment} from '../models/post.model'; // Update the import path
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface DeletePostResponse {
  message: string;
}
export interface CreatePostResponse {
  message: string;
  post: Post;
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'http://localhost:5000/posts';

  constructor(private http: HttpClient) {}

  //-----------------createPost------------------//
  createPost(postData: FormData): Observable<CreatePostResponse> {
    return this.http.post<CreatePostResponse>(this.API_URL, postData);
  }
  //---------------getPost---------------------------//
  getPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(this.API_URL);
  }
  //-------------deletePost------------------//
  deletePost(postId: string): Observable<DeletePostResponse> {
    return this.http.delete<DeletePostResponse>(`${this.API_URL}/${postId}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  //-------------------updqtePost--------------//
  updatePost(postData: FormData): Observable<any> {
    const postId = postData.get('_id') as string;
    return this.http.put<any>(`${this.API_URL}/${postId}`, postData).pipe(
      catchError(this.handleError('updatePost', []))
    );
  }
  // Add comment
  addComment(postId: string, comment: Comment): Observable<any> {
    return this.http.post(`http://localhost:5000/posts/${postId}/comments`, comment);
}

// Update comment
updateComment(postId: string, commentIndex: number, updatedComment: string): Observable<{ message: string; post: Post }> {
  return this.http.put<{ message: string; post: Post }>(`${this.API_URL}/${postId}/comments/${commentIndex}`, { comment: updatedComment });
}

// Delete comment
deleteComment(postId: string, commentIndex: number): Observable<{ message: string; post: Post }> {
  return this.http.delete<{ message: string; post: Post }>(`${this.API_URL}/${postId}/comments/${commentIndex}`);
}

}
