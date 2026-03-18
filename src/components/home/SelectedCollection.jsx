import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://remote-internship-api-production.up.railway.app/selectedCollection",
        );
        setCollection(data.data)
      } catch (error) {
        console.log("Failed to fetch selected collection", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

   if (loading || !collection) return (
      <header>
        <div className="selected-collection">
          <Skeleton width="100%" height="100%" />
          <div className="selected-collection__description">
            <Skeleton width="80px" height="80px" borderRadius="50%" />
            <Skeleton width="60%" height="2rem" borderRadius="6px" />
            <Skeleton width="30%" height="1rem" borderRadius="6px" />
            <Skeleton width="20%" height="1rem" borderRadius="6px" />
            <Skeleton width="160px" height="48px" borderRadius="8px" />
          </div>
        </div>
      </header>
    );

  return (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={collection.thumbnail}
          src={collection.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={collection.logo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">
            {collection.title}
          </h1>
          <Link to={"/user"} className="selected-collection__author">
            By {collection.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
            />
          </Link>
          <div className="selected-collection__details">{collection.amountOfItems} items · {collection.floorPrice} ETH</div>
          <Link to={`/collection/${collection.collectionId}`} className="selected-collection__button">
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  );
}
