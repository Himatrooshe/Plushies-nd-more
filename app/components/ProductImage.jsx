import {Image} from '@shopify/hydrogen';

export function ProductImage({image, className = ''}) {
  if (!image) {
    return (
      <div className={`product-image-placeholder ${className}`}>
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-image ${className}`}>
      <Image
        data={image}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
