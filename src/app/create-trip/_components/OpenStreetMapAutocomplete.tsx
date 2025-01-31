"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { PhotonFeature } from "@/lib/types";

interface OpenStreetMapAutocompleteProps {
  onSelect?: (feature: PhotonFeature | null) => void;
}

export const OpenStreetMapAutocomplete: React.FC<
  OpenStreetMapAutocompleteProps
> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Функция для поиска мест через Photon API
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`
        );
        const data: { features: PhotonFeature[] } = await response.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(inputValue);
    return () => fetchSuggestions.cancel();
  }, [inputValue, fetchSuggestions]);

  const handleSelect = (item: PhotonFeature) => {
    setInputValue(item.properties.name);
    setSuggestions([]);
    onSelect?.(item);
  };

  // Обработчик нажатия клавиши Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (suggestions.length > 0) {
        // Если есть предложения, выбираем первое
        handleSelect(suggestions[0]);
      } else {
        // Если предложений нет, просто сохраняем текущее значение
        onSelect?.({
          type: "Feature",
          properties: {
            name: inputValue,
            country: "",
            osm_id: 0,
          },
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиши
        placeholder="Search location..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && (
        <div className="absolute z-10 w-full p-2 bg-white border rounded-md shadow-lg">
          Loading...
        </div>
      )}

      {!isLoading && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.properties.osm_id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {item.properties.name} ({item.properties.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
