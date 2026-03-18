import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(12);
  const [sort, setSort] = useState("default")

  const sortItems = [...(user?.items || [])].sort((a, b) => {
    if (sort === "high") return parseFloat(b.price) - parseFloat(a.price)
    if (sort === "low") return parseFloat(a.price) - parseFloat(b.price)
  })

    useEffect(() => {
    window.scrollTo(0, 0);
    setUser(null);
    setLoading(true);
    AOS.init({ duration: 800, once: true });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUser(null);
    setLoading(true);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/user/${id}`,
        );
        setUser(data.data);
      } catch (error) {
        console.log("failed to fetch user", error.response?.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const items = user?.items || [];

  return (
    <>
      <header
        style={{
          backgroundImage: user?.imageLink
            ? `url(${user.imageLink})`
            : undefined,
        }}
        id="user-header"
      ></header>

      <section id="user-info" data-oas="fade-up">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              {loading || !user ? (
                <Skeleton width="80px" height="80px" borderRadius="50%" />
              ) : (
                <img
                  src={user?.profilePicture}
                  alt={user?.name}
                  className="user-info__img"
                />
              )}
            </figure>
            {loading || !user ? (
              <>
                <Skeleton width="160px" height="2rem" borderRadius="6px" />
                <Skeleton width="200px" height="1rem" borderRadius="4px" />
              </>
            ) : (
              <>
                <h1 className="user-info__name">{user.name}</h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="user-info__wallet__icon"
                    />
                    <span className="user-info__wallet__data">
                      {user.walletCode}
                    </span>
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      Joined {user.creationDate}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="user-items" data-aos="fade-up" data-aos-delay="100">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">{items.length} items</span>
            </div>
            <select className="user-items__header__sort" value={sort} onChange={(e) => {setSort (e.target.value); setVisible(12)}}>
              <option value="default">Default</option>
              <option value="high">Price high to low</option>
              <option value="low">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {loading
              ? new Array(12).fill(0).map((_, i) => (
                  <div className="item-column" key={i}>
                    <div className="item">
                      <figure className="item__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="12px"
                        />
                      </figure>
                      <div className="item__details">
                        <Skeleton
                          width="80%"
                          height="1rem"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="50%"
                          height="1rem"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="60%"
                          height="0.8rem"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))
              : sortItems.slice(0, visible).map((item) => (
                  <div className="item-column" key={item.itemId}>
                    <Link to={`/item/${item.itemId}`} className="item">
                      <figure className="item__img__wrapper">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          className="item__img"
                        />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">
                          {item.title}
                        </span>
                        <span className="item__details__price">{parseFloat(item.price).toFixed(2)} ETH</span>
                        <span className="item__details__last-sale">
                          Last sale: {parseFloat(item.lastSale).toFixed(2)} ETH
                        </span>
                      </div>
                      <div className="item__see-more" href="#">
                        <button className="item__see-more__button">
                          See More
                        </button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        {!loading && visible < sortItems.length && (
          <button className="collection-page__button" onClick={() => setVisible((prev) => prev + 6)}>Load more</button>
        )}
      </section>
    </>
  );
}
