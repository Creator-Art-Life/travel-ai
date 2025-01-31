import { useEffect, useState } from "react";

export function usePhotoTrip(location: string) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async (location: string) => {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY; // Замени на свой ключ API Unsplash
      const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        location
      )}&client_id=${accessKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setPhotoUrl(data.results[0].urls.regular); // Берем ссылку на "обычный" размер изображения
        } else {
          // Если Unsplash не нашел фото, используем заглушку или другой API
          setPhotoUrl("https://placehold.co/600x400?text=No+Image"); // Заглушка
        }
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
        setPhotoUrl("https://placehold.co/600x400?text=No+Image"); // Заглушка в случае ошибки
      }
    };

    fetchPhoto(location);
  }, [location]);

  return { photoUrl };
}
