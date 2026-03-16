import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";
import axios from "axios";

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
        <div className="collections__body">
          {loading
            ? new Array(6).fill(0).map((_, i) => (
                <div key={i} className="collection-column">
                  <div className="collection">
                    <Skeleton width="100%" height="200px" borderRadius="12px" />
                    <div className="collection__info">
                      <Skeleton width="60%" height="1rem" borderRadius="4px" />
                      <div className="collection__stats">
                        <Skeleton
                          width="80px"
                          height="1rem"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="80px"
                          height="1rem"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : collections.map((item) => (
                <div key={item.collectionId} className="collection-column">
                  <Link to="/collection/${item.collectionId}" className="collection">
                    <img
                      src={item.imageLink}
                      alt=""
                      className="collection__img"
                    />
                    <div className="collection__info">
                      <h3 className="collection__name">{item.title}</h3>
                      <div className="collection__stats">
                        <div className="collection__stat">
                          <span className="collection__stat__label">Floor</span>
                          <span className="collection__stat__data">
                            {parseFloat(item.floor).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            Total Volume
                          </span>
                          <span className="collection__stat__data">
                            {item.totalVolume} ETH
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
        <button className="collections-page__button">Load more</button>
      </div>
    </div>
  );
}
