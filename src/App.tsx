import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import PostDetail from './Postdetail';
import type { Post } from './Postlist';
import PostList from './Postlist';

export const App = () => {
  const allpostfetching = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = (await response.json()) as Post[];
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectPost = (postId: number) => {
    const post = allPosts.find((p) => p.id === postId);
    if (post === undefined) throw new Error('No Such Post');
    setSelectedPost(post);
    setSelectedPostId(postId);
  };

  useEffect(() => {
    let ignore = false;

    allpostfetching()
      .then((posts) => {
        if (posts === undefined) throw new Error('No posts');
        if (!ignore) {
          setAllPosts(posts);
          setSelectedPost(posts[0]);
        }
      })
      .catch(() => {
        console.error('Error fetching posts:');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();

  return (
    <div className="container">
      <div className="postlist">
        <h1>포스트 목록</h1>
        <PostList
          posts={allPosts}
          onSelectPost={handleSelectPost}
          selectedPostId={selectedPostId}
        />
      </div>
      <div className="separator" />
      <div className="postdetail">
        <PostDetail
          postId={selectedPostId}
          body={selectedPost === undefined ? undefined : selectedPost.body}
        />
      </div>
    </div>
  );
};
