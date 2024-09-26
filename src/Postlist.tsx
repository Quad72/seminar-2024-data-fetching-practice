import React from 'react';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>
                {post.id}. {post.title}
              </h2>
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
