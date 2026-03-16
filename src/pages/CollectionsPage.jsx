import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionGrid from "../components/collection/CollectionGrid";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <CollectionGrid collections={collections} loading={loading} loadMore />
      </div>
    </div>
  );
}
