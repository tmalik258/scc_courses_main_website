import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchImage } from "@/utils/supabase/fetchImage";

interface CategoryIconProps {
  icon: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CategoryIcon({
  icon,
  alt,
  width,
  height,
  className,
}: CategoryIconProps) {
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const url = await fetchImage(icon, "category-icons");
        setDisplayImageUrl(url);
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

    if (icon) {
      getImage();
    } else {
      setLoading(false);
    }
  }, [icon]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!icon) {
    return null; // Or a placeholder image
  }

  return (
    <Image
      src={displayImageUrl || "/"}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
