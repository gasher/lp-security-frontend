import React from 'react';
import { Image } from 'react-bootstrap';

const VideoFeed = ({ ip }) => {
  return (
    <div>
      <Image src={ip} fluid />
    </div>
  );
};

export default VideoFeed;
