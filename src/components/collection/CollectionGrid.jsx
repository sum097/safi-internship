import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

function CollectionCard({ item, linkPrefix = "/collection" }) {
  return (
    <Link
      to={`${linkPrefix}/${item.id || item.collectionId}`}
      className="collection"
    >
      <img src={item.imageLink} alt={item.title} className="collection__img" />
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
            <span className="collection__stat__label">Total Volume</span>
            <span className="collection__stat__data">
              {item.totalVolume} ETH
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ItemCard({ item, linkPrefix = "/item" }) {
  return (
    <Link to={`${linkPrefix}/${item.id || item.itemId}`} className="item">
      <figure className="item__img__wrapper">
        <img src={item.imageLink} alt={item.title} className="item__img" />
      </figure>
      <div className="item__details">
        <span className="item__details__name">{item.title}</span>
        <span className="item__details__price">
          {parseFloat(item.floor || item.price).toFixed(2)} ETH
        </span>
        <span className="item__details__last-sale">
          Last sale: {parseFloat(item.totalVolume || item.lastSale).toFixed(2)}{" "}
          ETH
        </span>
      </div>
      <div className="item__see-more">
        <button className="item__see-more__button">See More</button>
        <div className="item__see-more__icon">
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      </div>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="collection">
      <Skeleton width="100%" height="200px" borderRadius="0px" />
      <div className="collection__info">
        <div className="collection__stats">
          <div className="collection__stat">
            <Skeleton width="60px" height="0.85rem" borderRadius="4px" />
            <Skeleton width="90px" height="1rem" borderRadius="4px" />
          </div>
          <div className="collection__stat">
            <Skeleton width="80px" height="0.85rem" borderRadius="4px" />
            <Skeleton width="90px" height="1rem" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonItemCard() {
  return (
    <div className="item">
      <figure className="item__img__wrapper">
        <Skeleton width="100%" height="100%" borderRadius="0px" />
      </figure>
      <div className="item__details">
        <Skeleton width="60%" height="1rem" borderRadius="4px" />
        <Skeleton width="40%" height="1rem" borderRadius="4px" />
        <Skeleton width="50%" height="0.8rem" borderRadius="4px" />
      </div>
    </div>
  );
}

export default function CollectionGrid({
  collections,
  loading,
  slider = false,
  loadMore = false,
  linkPrefix = "/collection",
  loop = true,
  isItemCard = false,
}) {
  const [visible, setVisible] = useState(12);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (slider) {
    return (
      <div className="collection-slider">
        <button
          ref={prevRef}
          className="collection-slider__btn collection-slider__btn--prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path
              d="M7 1L1 7L7 13"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="collection-slider__btn collection-slider__btn--next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path
              d="M1 1L7 7L1 13"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop={loop}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        >
          {loading
            ? new Array(6).fill(0).map((_, i) => (
                <SwiperSlide key={i} className="collection-column">
                  {isItemCard ? <SkeletonItemCard /> : <SkeletonCard />}
                </SwiperSlide>
              ))
            : collections.map((item) => (
                <SwiperSlide
                  key={item.id || item.collectionId}
                  className="collection-column"
                >
                  {isItemCard ? (
                    <ItemCard item={item} linkPrefix={linkPrefix} />
                  ) : (
                    <CollectionCard item={item} linkPrefix={linkPrefix} />
                  )}
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    );
  }

  return (
    <>
      <div className="collections__body">
        {loading
          ? new Array(12).fill(0).map((_, i) => (
              <div key={i} className="collection-column">
                {isItemCard ? <SkeletonItemCard /> : <SkeletonCard />}
              </div>
            ))
          : collections.slice(0, visible).map((item) => (
              <div
                key={item.id || item.collectionId}
                className="collection-column"
              >
                {isItemCard ? (
                  <ItemCard item={item} linkPrefix={linkPrefix} />
                ) : (
                  <CollectionCard item={item} linkPrefix={linkPrefix} />
                )}
              </div>
            ))}
      </div>
      {loadMore && (loading || visible < collections.length) && (
        <button
          className="collections-page__button"
          onClick={() => setVisible((prev) => prev + 6)}
        >
          Load more
        </button>
      )}
    </>
  );
}
