import { useState, useEffect } from 'react';

export default function UnsplashImage({ query, className }: { query: string, className?: string }) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results[0]) {
          setImgUrl(data.results[0].urls.regular);
        } else {
          setImgUrl(null);
        }
      })
      .catch(() => setImgUrl(null))
      .finally(() => setLoading(false));
  }, [query]);
  if (loading) return <div className={className + ' flex items-center justify-center h-full'}>Loading...</div>;
  if (imgUrl) return <img src={imgUrl} alt={query} className={className} />;
  return <div className={className + ' flex items-center justify-center h-full text-gray-400'}>No image</div>;
} 