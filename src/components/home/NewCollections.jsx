import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CollectionGrid from "../collection/CollectionGrid.jsx";

export default function NewCollections() {
  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://remote-internship-api-production.up.railway.app/newCollections",
        );
        setNewCollections(data.data);
      } catch (error) {
        console.log("Failed to fetch new collection", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <CollectionGrid collections={newCollections} loading={loading} slider />
        </div>
      </div>
    </section>
  );
}
