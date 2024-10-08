import React, { useEffect, useState } from 'react';

interface comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostDetailProps {
  postId: number;
  body: string | undefined;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, body }) => {
  const [Comments, setComments] = useState<comment[]>([]);
  const [loading, setLoading] = useState(true);

  const allpostfetching = async (Id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${Id}/comments`,
      );
      const data = (await response.json()) as comment[];
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    allpostfetching(postId)
      .then((comments) => {
        if (comments === undefined) throw new Error('No posts');
        if (!ignore) setComments(comments);
      })
      .catch(() => {
        console.error('Error fetching posts:');
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [postId]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2 style={{ margin: '10px 0' }}>내용</h2>
      <li style={{ marginBottom: '20px', listStyleType: 'none', padding: 0 }}>
        {body}
      </li>
      <h2 style={{ margin: '10px 0' }}>댓글</h2>
      <ul style={{ listStyleType: 'none', padding: '0 10px' }}>
        {Comments.length > 0 ? (
          Comments.map((comment) => (
            <li key={comment.id} style={{ margin: '20px 0' }}>
              <strong>
                작성자: {comment.email} <br />
              </strong>
              {comment.body}
            </li>
          ))
        ) : (
          <li>댓글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default PostDetail;
