import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function NewCollections() {
  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
          <Swiper
            modules={[Navigation]}
            navigation
            loop
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
          >
            {loading
              ? new Array(6).fill(0).map((_, i) => (
                  <SwiperSlide key={i} className="collection-column">
                    <div className="collection">
                      <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="12px"
                      />
                      <div className="collection__info">
                        <Skeleton
                          width="60%"
                          height="1rem"
                          borderRadius="4px"
                        />
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
                  </SwiperSlide>
                ))
              : newCollections.map((item) => (
                  <SwiperSlide
                    key={item.collectionId}
                    className="collection-column"
                  >
                    <Link
                      to={`/collection/${item.collectionId}`}
                      className="collection"
                    >
                      <img
                        src={item.imageLink}
                        alt={item.title}
                        className="collection__img"
                      />
                      <div className="collection__info">
                        <h3 className="collection__name">{item.title}</h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Floor
                            </span>
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
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
