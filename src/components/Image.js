import React, { useEffect, useRef } from 'react';
import { useObserver } from '../hooks/useObserver';

export default function Image({ image, isLast, newLimit }) {
  const imageRef = useRef();
  const entry = useObserver(imageRef, { rootMargin: '100px' });

  useEffect(() => {
    if (!entry) return;

    if (isLast && entry.isIntersecting) {
      console.log('The last image is in the viewport');
      newLimit();
    }
  }, [entry, isLast]);

  // useEffect(() => {
  //   if (!imageRef?.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (isLast && entry.isIntersecting) {
  //         console.log('The last image is in the viewport', entry);
  //         newLimit();
  //         observer.unobserve(entry.target);
  //       }
  //     },
  //     { rootMargin: '-100px' }
  //   );

  //   observer.observe(imageRef.current);
  // }, [isLast]);

  return (
    <div style={{ width: '100%', maxWidth: '425px', height: '425px' }}>
      <img
        ref={imageRef}
        src={image.node.secure_url}
        alt={image.node.public_url}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
}
