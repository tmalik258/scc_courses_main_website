import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchImage } from "@/utils/supabase/fetchImage";

interface CategoryIconProps {
  slug: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CategoryIcon({
  slug,
  alt,
  width,
  height,
  className,
}: CategoryIconProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const url = await fetchImage(slug, "category-icons");
        setImageUrl(url);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getImage();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!imageUrl) {
    return null; // Or a placeholder image
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}