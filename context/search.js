"use client";
import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  const fetchSearchResults = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search?searchQuery=${searchQuery}`,
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setSearchResults(data);

      console.log(data);

      router.push(`/search?searchQuery=${searchQuery}`);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        fetchSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useGlobalContext = () => useContext(SearchContext);
