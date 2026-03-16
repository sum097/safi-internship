import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

function CollectionCard({ item }) {
  return (
    <Link to={`/collection/${item.collectionId}`} className="collection">
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

function SkeletonCard () {
    return (
    <div className="collection">
      <Skeleton width="100%" height="200px" borderRadius="12px" />
      <div className="collection__info">
        <Skeleton width="60%" height="1rem" borderRadius="4px" />
        <div className="collection__stats">
          <Skeleton width="80px" height="1rem" borderRadius="4px" />
          <Skeleton width="80px" height="1rem" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}


export default function CollectionGrid( { collections, loading, slider = false, loadMore = false }) {
  const [visible, setVisible] = useState(12)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (slider) {
    return (
      <div className="collection-slider">
        <button ref={prevRef} className="collection-slider__btn collection-slider__btn--prev">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button ref={nextRef} className="collection-slider__btn collection-slider__btn--next">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop
          spaceBetween={20}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
        >{loading
          ? new Array(6).fill(0).map((_, i) => (
              <SwiperSlide key={i} className="collection-column">
                <SkeletonCard />
              </SwiperSlide>
            ))
          : collections.map((item) => (
              <SwiperSlide key={item.collectionId} className="collection-column">
                <CollectionCard item={item} />
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
          ? new Array(6).fill(0).map((_, i) => (
              <div key={i} className="collection-column">
                <SkeletonCard />
              </div>
            ))
          : collections.slice(0, visible).map((item) => (
              <div key={item.collectionId} className="collection-column">
                <CollectionCard item={item} />
              </div>
            ))}
      </div>
      {loadMore && !loading && visible < collections.length && (
        <button
          className="collections-page__button"
          onClick={() => setVisible((prev) => prev + 6)}
        >
          Load more
        </button>
      )}
    </>
  )
}
