import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../../components/ui/Skeleton.jsx";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://remote-internship-api-production.up.railway.app/trendingNFTs",
        );
        setTrending(data.data);
      } catch (error) {
        console.log("Failed to fetch trending NFTs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const firstColumn = trending.slice(0, 5);
  const secondColumn = trending.slice(5, 10);

  const renderSkeletonRows = () =>
    new Array(5).fill(0).map((_, i) => (
      <div key={i} className="trending-collection">
        <Skeleton width="24px" height="1rem" borderRadius="4px" />
        <div className="trending-collection__collection">
          <figure className="trending-collection__img__wrapper">
            <Skeleton width="40px" height="40px" borderRadius="50%" />
          </figure>
          <Skeleton width="120px" height="1rem" borderRadius="4px" />
        </div>
        <Skeleton width="60px" height="1rem" borderRadius="4px" />
        <Skeleton width="60px" height="1rem" borderRadius="4px" />
      </div>
    ));

  const renderRows = (items) =>
    items.map((item) => (
      <Link
        to={`/collection/${item.collectionId}`}
        key={item.collectionId}
        className="trending-collection"
      >
        <div className="trending-collection__rank">{item.rank}</div>
        <div className="trending-collection__collection">
          <figure className="trending-collection__img__wrapper">
            <img
              src={item.imageLink}
              alt={item.title}
              className="trending-collection__img"
            />
          </figure>
          <div className="trending-collection__name">{item.title}</div>
          <img
            src={VerifiedIcon}
            className="trending-collection__verified"
          />
        </div>
        <div className="trending-collection__price">
          <span className="trending-collection__price__span">
            {item.floor} ETH
          </span>
        </div>
        <div className="trending-collection__volume">
          <span className="trending-collection__volume__span">
            {item.totalVolume}
          </span>
        </div>
      </Link>
    ));

  const columnHeader = (extraClass = "") => (
    <div className={`trending-column__header ${extraClass}`}>
      <div className="trending-column__header__rank">#</div>
      <div className="trending-column__header__collection">Collection</div>
      <div className="trending-column__header__price">Floor Price</div>
      <div className="trending-column__header__price">Volume</div>
    </div>
  );

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              {columnHeader()}
              <div className="trending-column__body">
                {loading ? renderSkeletonRows() : renderRows(firstColumn)}
              </div>
            </div>
            <div className="trending-column">
              {columnHeader("trending-column__header2")}
              <div className="trending-column__body">
                {loading ? renderSkeletonRows() : renderRows(secondColumn)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}