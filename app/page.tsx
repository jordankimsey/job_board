'use client';
import { useState } from 'react';
import JobPost, { JobPostType } from './JobPost';
import styles from './page.module.css';

export default function Home() {
  const loadMoreCount = 6;
  const [next, setNext] = useState(9);

  const handleMore = () => {
    console.log('fetching more', next + loadMoreCount);
    setNext(next + loadMoreCount);
  };

  const getCompanyNameFromDescription = (description: string) => {
    const companyName = description.split('Is Hiring');
    console.log(companyName);
    if (!companyName[1]) {
      const companyName2 = description.split('Is Looking');
      return companyName2[0];
    } else {
      return companyName[0];
    }
  };

  const samplePosts = [
    {
      company: 'AcmeCo',
      description: 'Motion (YC W20) Is Hiring junior Frontend engineers',
      date: '1/20/2022',
      id: '1',
      url: 'www.google.com',
    },
    {
      company: 'AcmeCo',
      description: 'Is Hiring junior Frontend engineers',
      date: '1/20/2022',
      id: '1',
      url: 'www.google.com',
    },
    {
      company: 'AcmeCo',
      description: 'AcmeCo (WC20) Is Looking for junior Frontend engineers',
      date: '1/20/2022',
      id: '1',
      url: 'www.google.com',
    },
  ];

  return (
    <main className={styles.main}>
      <div className='w-full text-center'>
        <h1 className='text-4xl font-bold italic pb-5'>HN Jobs</h1>
        <h4>{getCompanyNameFromDescription(samplePosts[2].description)}</h4>
        <div className='grid grid-cols-3 gap-4'>
          {samplePosts.length > 0 ? (
            samplePosts.map((post, index) => (
              <JobPost post={post} key={index} />
            ))
          ) : (
            <h1>No post found</h1>
          )}
        </div>
        <div className='mt-5'>
          <button
            onClick={handleMore}
            className='border py-2 px-4 border-black '
          >
            Load more
          </button>
        </div>
      </div>
    </main>
  );
}
