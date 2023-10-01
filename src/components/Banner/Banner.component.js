import React from 'react';
import videoBanner from '../../assets/video/video5.mp4'

export default function Banner() {
    return (
        <div className="banner-video">
            <video
                src={videoBanner}
                autoPlay
                loop
                muted
                poster="/path-to-your-poster-image.jpg"
                width="100%"
            />
        </div>
    )
}
