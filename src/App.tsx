import './reset.css';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    let ignore = false;

    allpostfetching()
      .then((posts) => {
        if (posts === undefined) throw new Error('No posts');
        if (!ignore) setAllPosts(posts);
      })
      .catch(() => {
        console.error('Error fetching posts:');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const [allPosts, setAllPosts] = useState<Post[]>([]);

  return (
    <div>
      <h1>포스트 목록</h1>
      <PostList posts={allPosts} />
    </div>
  );
};
