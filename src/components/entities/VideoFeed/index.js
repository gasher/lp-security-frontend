import React from 'react';
import { Image } from 'react-bootstrap';

const VideoFeed = ({ ip_address }) => {
  return (
    <div>
      <Image src={ip_address} fluid />
    </div>
  );
};

export default VideoFeed;
