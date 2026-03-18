import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${id}`,
        );
        setCollection(data.data);
      } catch (error) {
        console.log("failed to fetch collection", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <CollectionHeader collection={collection} loading={loading} />
      <div data-aos="fade-up">
        <CollectionInfo collection={collection} loading={loading} />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <CollectionItems collection={collection} loading={loading} />
      </div>
    </>
  );
}
