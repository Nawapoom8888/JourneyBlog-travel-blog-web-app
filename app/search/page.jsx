"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/search";
import BlogsList from "@/components/BlogsList";
import BodyWrapper from "@/components/BodyWrapper";

export default function page() {
  const { setSearchQuery, searchResults, setSearchResults } =
    useGlobalContext();
  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  // to fetch results on page load based on query
  useEffect(() => {
    if (query) {
      console.log(
        "Got search params in search page => ",
        searchParams.get("searchQuery"),
      );
      setSearchQuery(query);
      fetchResultsOnLoad(query);
    }
  }, [query]);

  const fetchResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search?searchQuery=${query}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <BodyWrapper>
      <div className="my-6 flex flex-col items-center justify-center">
        <p className="mb-12 text-xl font-semibold">
          Search result : {searchResults.length}
        </p>
        {searchResults ? <BlogsList blogs={searchResults} /> : ""}
      </div>
    </BodyWrapper>
  );
}
