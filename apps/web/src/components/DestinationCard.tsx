import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface DestinationCardProps {
  city: string;
  country: string;
  price: string;
  wifi: number;
  weather: string;
  image: string; // not used for direct image, always search by city
  onSelect: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  city,
  country,
  price,
  wifi,
  weather,
  onSelect,
}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results[0]) {
          setImgUrl(data.results[0].urls.regular);
        } else {
          setImgUrl(null); // No image found
        }
      })
      .catch(() => setImgUrl(null))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div
      className="rounded-xl shadow-lg bg-white overflow-hidden cursor-pointer hover:shadow-2xl transition-all w-80"
      onClick={onSelect}
    >
      {/* Image Cover */}
      <div className="relative h-44 w-full bg-gray-200">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : imgUrl ? (
          <Image
            src={imgUrl}
            alt={`${city} cover`}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
        {/* Overlay Info */}
        <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
          <span className="fi fi-id mr-1" /> {/* Placeholder for flag */}
          {country}
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
          <span className="material-icons text-base mr-1">wifi</span>
          {wifi} Mbps
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4 pt-2 flex flex-col gap-1">
        <div className="font-bold text-lg text-gray-900">{city}</div>
        <div className="text-gray-700 text-base mb-3">{price}<span className="ml-2 text-xs text-gray-500"></span></div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <span className="material-icons text-base"></span>
          {weather}
        </div>
      </div>
    </div>
  );
}; 