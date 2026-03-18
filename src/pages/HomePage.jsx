import React, { useEffect } from "react";
import SelectedCollection from "../components/home/SelectedCollection.jsx";
import NewCollections from "../components/home/NewCollections.jsx";
import PopularCollections from "../components/home/PopularCollections.jsx";
import Trending from "../components/home/Trending.jsx";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SelectedCollection />
      <div data-aos="fade-up">
        <Trending />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Trending />
        <NewCollections />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <PopularCollections />
      </div>
    </>
  );
}
