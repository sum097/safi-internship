import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 56,
  });
  const endTimeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/item/${id}`,
        );
        setItem(data.data);
        endTimeRef.current = data.data.expiryDate;
      } catch (error) {
        console.log("failed to fetch collection", error.response?.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setItem(null);
    setLoading(true);
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTimeRef.current - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  <div className="item-page__img__likes">
                    {loading ? (
                      <Skeleton width="40px" height="1rem" borderRadius="4px" />
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="item-page__img__icon"
                        />
                        <span className="item-page__img__likes__text">
                          {item?.favorites ?? 0}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {loading ? (
                  <Skeleton width="100%" height="100%" borderRadius="0px" />
                ) : (
                  <img
                    src={item.imageLink}
                    alt={item.title}
                    className="item-page__img"
                  />
                )}
              </figure>
            </div>
            <div className="item-page__right">
              {loading ? (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Skeleton width="120px" height="1rem" borderRadius="4px" />
                  </div>
                  <Skeleton width="300px" height="2rem" borderRadius="6px" />
                  <div style={{ marginTop: "4px" }}>
                    <Skeleton width="150px" height="1rem" borderRadius="4px" />
                  </div>
                  <div className="item-page__details">
                    <Skeleton width="80px" height="1rem" borderRadius="4px" />
                    <Skeleton width="80px" height="1rem" borderRadius="4px" />
                    <Skeleton width="100px" height="1rem" borderRadius="4px" />
                  </div>
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <Skeleton width="60%" height="1rem" borderRadius="4px" />
                    </div>
                    <div
                      className="item-page__sale__body"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Skeleton
                        width="80px"
                        height="0.8rem"
                        borderRadius="4px"
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <Skeleton
                          width="120px"
                          height="1.5rem"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="80px"
                          height="1rem"
                          borderRadius="4px"
                        />
                      </div>
                      <Skeleton width="100%" height="48px" borderRadius="8px" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={`/collection/${item.collectionId}`}
                    className="item-page__collection light-blue"
                  >
                    {item.collection}
                  </Link>
                  <h1 className="item-page__name">{item.title}</h1>
                  <span className="item-page__owner">
                    Owned by{" "}
                    <Link
                      to={`/user/${item.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {item.owner}
                    </Link>
                  </span>
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item.views} views
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item.favorites} favorites
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <div className="green-pulse"></div>
                      <span>
                        Sale ends in {timeLeft.hours}h {timeLeft.minutes}m{" "}
                        {timeLeft.seconds}s
                      </span>
                    </div>
                    <div className="item-page__sale__body">
                      <span className="item-page__sale__label">
                        Current price
                      </span>
                      <div className="item-page__sale__price">
                        <span className="item-page__sale__price__eth">
                          {parseFloat(item.ethPrice).toFixed(2)} ETH
                        </span>
                        <span className="item-page__sale__price__dollars">
                          {item.usdPrice}
                        </span>
                      </div>
                      <div className="item-page__sale__buttons">
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <RecommendedItems collectionId={item?.collectionId} currentItemId={id} />
    </>
  );
}
