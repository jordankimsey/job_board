import React from 'react';
import { JobPostType } from './page';

const getCompanyNameFromDescription = (description: string, showCompany: boolean) => {
    
  if (!description) return 'Error';
  const companyName = description.toLowerCase().split('is hiring');
  if (!companyName[1]) {
    const companyName2 = description.toLowerCase().split('Is Looking');
    return showCompany ? companyName2[0]?.toUpperCase() : `Is Looking ${companyName2[1]?.toUpperCase()}`;
  } else {
    return showCompany ? companyName[0]?.toUpperCase() : `Is Hiring ${companyName[1]?.toUpperCase()}`;
  }
};

const JobPost = ({ post }: { post: JobPostType }) => {
  const handleClick = () => {
    if (post.url) {
      //redirect tot that url
      window.open(post.url, '_blank', 'noreferrer');
    } else {
      //redirect to https://news.ycombinator.com/item?id=<POST_ID> in a new tab
      window.open(
        ` https://news.ycombinator.com/item?id=${post.id}`,
        '_blank',
        'noreferrer'
      );
    }
  };

  const dateTime = new Date(post.time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div
      className='flex flex-col justify-between border-2 border-black px-6 py-3 h-60 cursor-pointer'
      onClick={handleClick}
    >
      <h3 className='font-bold'>
        {post.title && getCompanyNameFromDescription(post.title, true)}
      </h3>
      <h5 className='font-bold'>
        {post.title && getCompanyNameFromDescription(post.title, false)}
      </h5>
      <p>{dateTime}</p>
    </div>
  );
};

export default JobPost;
