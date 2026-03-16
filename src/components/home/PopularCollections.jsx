import axios from "axios";
import React, { useEffect, useState } from "react";
import CollectionGrid from "../collection/CollectionGrid.jsx";


export default function PopularCollections() {
  const [popularCollections, setPopularCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://remote-internship-api-production.up.railway.app/popularCollections",
        );
        setPopularCollections(data.data);
      } catch (error) {
        console.log("Failed to fetch new collection", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <CollectionGrid collections={popularCollections} loading={loading} slider />
        </div>
      </div>
    </section>
  );
}
