  export interface Post {
    _id?: string;
    userLogo: string;
    clubName: string;
    postTime: string;
    imageUrl: string | null;
    videoUrl: string | null;
    content: string;
    sharesCount: number;
    comments: Comment[];
    likesCount: number;
    liked: boolean;
    showOptions: boolean;
    createdAt: string;
  }

  export interface Comment {
    _id?: string;
    text: string;
    showOptions: boolean;
    editing: boolean;
  }
  export interface LikeShareResponse {
    message: string;
    post: Post;
  }
