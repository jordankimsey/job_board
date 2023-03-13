'use client';
import { useState, useEffect } from 'react';
import JobPost from './JobPost';
import styles from './page.module.css';

export interface JobPostType {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
  text?: string;
}

export default function Home() {
  const loadMoreCount = 6;
  const [next, setNext] = useState(9);
  const [sliceFrom, setSliceFrom] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobPosts, setJobPosts] = useState<JobPostType[]>([]);

  const fetchJobPosts = async () => {
    const jobPostIds = await fetch(
      'https://hacker-news.firebaseio.com/v0/jobstories.json'
    );
    const data: string[] = await jobPostIds.json();
    return data;
  };

  const fetchJobData = async () => {
    setLoading(true);
    const postIds = await fetchJobPosts();
    await Promise.all(
      postIds.slice(sliceFrom, next).map(async (id) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        const data = await res.json();
        return data;
      })
    )
      .then((result: JobPostType[]) => {
        setJobPosts(prev => [...prev, ...result]);
      })
      .then(() => setLoading(false))
      .then(() => {
        setSliceFrom(next);
        setNext(next + loadMoreCount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchJobData()
  }, []);

  const handleMore = () => {
      fetchJobData()
  };

  return (
    <main className={styles.main}>
      <div className='w-full text-center'>
        <h1 className='text-4xl font-bold italic pb-5'>HN Jobs</h1>
        <div className='grid grid-cols-3 gap-4'>
          {loading ? (
            <div>Loading...</div>
          ) : jobPosts.length > 0 ? (
            jobPosts
              .slice(0, next)
              .map((post, index) => <JobPost post={post} key={index} />)
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
