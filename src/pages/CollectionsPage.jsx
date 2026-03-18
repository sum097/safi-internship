import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionGrid from "../components/collection/CollectionGrid";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
  }, []);

  // a
  // b
  // c

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://remote-internship-api-production.up.railway.app/collections",
        );
        setCollections(data.data);
      } catch (error) {
        console.log("Failed to fetch collections", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div data-aos="fade-up" data-aos-delay="100">
          <CollectionGrid
            collections={collections}
            loading={loading}
            loadMore
          />
        </div>
      </div>
    </div>
  );
}
