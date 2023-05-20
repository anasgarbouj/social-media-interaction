
import { Component, OnInit } from '@angular/core';
import { PostService, CreatePostResponse , DeletePostResponse} from '../services/post.service';
import { Post, Comment } from '../models/post.model';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  userComment: string = '';
  displayedCommentsCount: number = 2;
  uploadedImageUrl: string | null = '';
uploadedVideoUrl: string | null = '';

  uploadedImage: File | null = null;
  uploadedVideo: File | null = null;
  content: string = '';
  posts: Post[] = [];
  userLogo: string = 'assets/logo.png';
  clubName: string = 'Example Club';
  postTime: string = 'Just now';
  selectedPost: Post | null = null;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe(
      (response: any) => {
        this.posts = response.posts.map((post: Post) => {
          post.imageUrl = post.imageUrl ? `http://localhost:5000/${post.imageUrl}` : null;
          post.videoUrl = post.videoUrl ? `http://localhost:5000/${post.videoUrl}` : null;
          
          // Map the comments array to match the Comment model structure
          post.comments = post.comments.map((comment: any) => ({
            text: comment.text,
            showOptions: comment.showOptions,
            editing: comment.editing
          }));
  
          return post;
        }).reverse();
        console.log(response);
      },
      (error) => {
        console.error('Failed to fetch posts:', error);
      }
    );
  }

  openCreateModal(): void {
    this.selectedPost = null;
    this.content = "";
    this.uploadedImage = null;
    this.uploadedVideo = null;
    const modelDiv = document.getElementById("myModal");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.type.startsWith('image/')) {
        this.uploadedImage = file;
        this.uploadedVideo = null;
  
        // Create a URL for the selected image file for preview.
        this.uploadedImageUrl = URL.createObjectURL(file);
      }
    }
  }
  openFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }


  sharePost(post: Post): void {
    // Implement sharing functionality here, if needed.
    post.sharesCount++;
  }
  publishPost(): void {
    if (this.selectedPost) {
      this.updatePost(this.selectedPost);
    } else {
      if (this.content.trim() !== "" || this.uploadedImage || this.uploadedVideo) {
        const newPost: Post = {
          userLogo: this.userLogo,
          clubName: this.clubName,
          postTime: this.postTime,
          imageUrl: this.uploadedImage ? this.uploadedImage.name : null,
          videoUrl: this.uploadedVideo ? this.uploadedVideo.name : null,
          content: this.content,
          sharesCount: 0,
          comments: [],
          likesCount: 0,
          liked: false,
          showOptions: false,
          createdAt: new Date().toISOString(),
        };
  
        const formData: FormData = new FormData();
        formData.append('userLogo', this.userLogo);
        formData.append('clubName', this.clubName);
        formData.append('postTime', this.postTime);
        formData.append('content', this.content);
        formData.append('sharesCount', '0');
        formData.append('likesCount', '0');
        formData.append('liked', 'false');
        formData.append('showOptions', 'false');
        formData.append('createdAt', new Date().toISOString());
        if (this.uploadedImage) {
          formData.append('image', this.uploadedImage);
        }
        if (this.uploadedVideo) {
          formData.append('video', this.uploadedVideo);
        }
      console.log('Form Data:', formData);
  
      this.postService.createPost(formData).subscribe(
        (response: CreatePostResponse) => {
          console.log('Post created:', response);
          this.posts.unshift(response.post); // Refresh the list of posts after creating
        },
        (error) => {
          console.error('Failed to create post:', error);
        }
      );
  
      this.content = '';
      this.uploadedImage = null;
      this.uploadedVideo = null;
      this.closeModel();
    }
  }
}
  
submitComment(post: Post): void {
  if (this.userComment.trim() !== "") {
    if (post._id) {
      const newComment: Comment = {
        text: this.userComment,
        showOptions: false,
        editing: false,
      };
      this.postService.addComment(post._id, newComment).subscribe(
        (response) => {
          console.log('Comment added:', response);
          const addedComment: Comment = response.comment;
          post.comments.push(addedComment); // Add the comment from the response
          this.userComment = '';
        },
        (error) => {
          console.error('Failed to add comment:', error);
        }
      );
    } else {
      console.error('Post _id is undefined');
    }
  }
}





  toggleLike(post: Post): void {
    if (post.liked) {
      post.likesCount--;
    } else {
      post.likesCount++;
    }
    post.liked = !post.liked;
  }

  toggleOptions(comment: Comment): void {
    comment.showOptions = !comment.showOptions;
  }

  editComment(comment: Comment): void {
    comment.showOptions = false;
    comment.editing = true;
  }

  deleteComment(post: Post, comment: Comment): void {
    const commentIndex = post.comments.indexOf(comment);
    if (commentIndex > -1 && post._id) {
      this.postService.deleteComment(post._id, commentIndex).subscribe(
        (response) => {
          console.log('Comment deleted:', response);
          post.comments = post.comments.filter((c) => c !== comment); // You might want to get the comments from the response instead
        },
        (error) => {
          console.error('Failed to delete comment:', error);
        }
      );
    } else {
      console.error('Either comment not found or post _id is undefined');
    }
  }

  showMoreComments(): void {
    this.displayedCommentsCount += 2;
  }

  hideMoreComments(): void {
    this.displayedCommentsCount = 2;
  }

  saveEditedComment(comment: Comment, post: Post, index: number, event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      comment.editing = false;
      const newComment = (event.target as HTMLTextAreaElement).value;
      if (newComment.trim() !== '') {
        if (post._id) {
          this.postService.updateComment(post._id, index, newComment).subscribe(
            (response) => {
              console.log('Comment updated:', response);
              comment.text = newComment; // You might want to get the comment from the response instead
            },
            (error) => {
              console.error('Failed to update comment:', error);
            }
          );
        } else {
          console.error('Post _id is undefined');
        }
      }
    }
  }

  togglePostOptions(post: Post): void {
    post.showOptions = !post.showOptions;
  }
//-----------------------deletePost----------------//
deletePost(post: Post): void {
  if (post._id) {
    this.postService.deletePost(post._id).subscribe(
      (response: DeletePostResponse) => {
        console.log('Post deleted:', response);
        this.posts = this.posts.filter((p) => p !== post);
      },
      (error) => {
        console.error('Failed to delete post:', error);
      }
    );
  } else {
    console.error('Post _id is undefined');
  }
}
  
openUpdateModal(post: Post): void {
  this.selectedPost = post;
  this.content = post.content;
  this.uploadedImageUrl = post.imageUrl !== null ? post.imageUrl : null;
this.uploadedVideoUrl = post.videoUrl !== null ? post.videoUrl : null;
  const modelDiv = document.getElementById("myModal");
  if (modelDiv != null) {
    modelDiv.style.display = "block";
  }
}
  
updatePost(post: Post): void {
  if (this.content.trim() !== "" || this.uploadedImage || this.uploadedVideo) {
    const formData: FormData = new FormData();
    if (post._id) {
      formData.append('_id', post._id); // Add the postId to the FormData object
    }
    formData.append('userLogo', this.userLogo);
    formData.append('clubName', this.clubName);
    formData.append('postTime', this.postTime);
    formData.append('content', this.content);
    formData.append('sharesCount', '0');
    formData.append('likesCount', '0');
    formData.append('liked', 'false');
    formData.append('showOptions', 'false');
    formData.append('createdAt', new Date().toISOString());
    if (this.uploadedImage) {
      formData.append('image', this.uploadedImage);
    }
    if (this.uploadedVideo) {
      formData.append('video', this.uploadedVideo);
    }

    console.log('Form Data:', formData); // Log the form data to the console

    // Make the HTTP request to update the post
    this.postService.updatePost(formData).subscribe(
      (response) => {
        console.log('Post updated:', response);
        this.fetchPosts(); // Refresh the list of posts after updating
      },
      (error) => {
        console.error('Failed to update post:', error);
      }
    );

    this.content = "";
    this.uploadedImage = null;
    this.uploadedVideo = null;
    this.closeModel();
  }
}

}

