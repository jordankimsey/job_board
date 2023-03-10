import React from 'react';

export type JobPostType = {
  company: string;
  description: string;
  date: string;
  url?: string;
  id: string;
};

const JobPost = ({ post }: { post: JobPostType }) => {
  const handleClick = () => {
    if (post.url) {
      //redirect tot that url
    } else {
      //redirect to https://news.ycombinator.com/item?id=<POST_ID> in a new tab
    }
  };

  return (
    <div className='flex flex-col justify-between border-2 border-black px-6 py-3 h-60'>
      <h3 className='font-bold'>{post.company}</h3>
      <h5 className='font-bold'>{post.description}</h5>
      <p>{post.date}</p>
    </div>
  );
};

export default JobPost;
