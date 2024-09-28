import React from 'react';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostListProps {
  posts: Post[];
  onSelectPost: (postId: number) => void;
  selectedPostId: number;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onSelectPost,
  selectedPostId,
}) => {
  return (
    <div>
      {posts.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0 10px' }}>
          {posts.map((post) => (
            <li
              key={post.id}
              onClick={() => {
                onSelectPost(post.id);
              }}
              className={`list-item ${post.id === selectedPostId ? 'selected' : ''}`}
            >
              <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                {post.id}.
              </span>
              {post.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
