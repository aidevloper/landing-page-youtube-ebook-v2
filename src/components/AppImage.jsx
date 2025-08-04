import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        overflow: 'hidden',
        scrollBehavior: 'auto',
        WebkitOverflowScrolling: 'auto',
        overscrollBehavior: 'none',
        pointerEvents: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        transform: 'none',
        animation: 'none',
        transition: 'none',
        willChange: 'auto',
        ...props.style
      }}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;
