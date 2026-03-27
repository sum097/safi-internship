import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton.jsx";

export default function CollectionItems({ collection, loading }) {
  const [visible, setVisible] = useState(12);
  const [sort, setSort] = useState("default");

  const items = [...(collection?.items || [])].sort((a, b) => {
    if (sort === "high") return parseFloat(b.price) - parseFloat(a.price);
    if (sort === "low") return parseFloat(a.price) - parseFloat(b.price);
  });

  if (loading) {
    return (
      <section id="collection-items">
        <div className="row collection-items__row">
          <div className="collection-items__header">
            <div className="collection-items__header__left">
              <Skeleton width="40px" height="1rem" borderRadius="4px" />
              <Skeleton width="80px" height="1rem" borderRadius="4px" />
            </div>
            <Skeleton width="120px" height="2rem" borderRadius="6px" />
          </div>
          <div className="collection-items__body">
            {new Array(10).fill(0).map((_, i) => (
              <div key={i} className="item-column">
                <div className="item">
                  <figure className="item__img__wrapper">
                    <Skeleton width="100%" height="100%" borderRadius="0px" />
                  </figure>
                  <div className="item__details">
                    <Skeleton width="50%" height="1rem" borderRadius="4px" />
                    <Skeleton width="30%" height="1rem" borderRadius="4px" />
                    <Skeleton width="40%" height="0.8rem" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {items.length} results
            </span>
          </div>
          <select
            className="collection-items__header__sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setVisible(12);
            }}
          >
            <option value="default">Default</option>
            <option value="high">Price high to low</option>
            <option value="low">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {items.slice(0, visible).map((item) => (
            <div key={item.itemId} className="item-column">
              <Link to={`/item/${item.itemId}`} className="item">
                <figure className="item__img__wrapper">
                  <img
                    src={item.imageLink}
                    alt={item.title}
                    className="item__img"
                  />
                </figure>
                <div className="item__details">
                  <span className="item__details__name">{item.title}</span>
                  <span className="item__details__price">
                    {parseFloat(item.price).toFixed(2)} ETH
                  </span>
                  <span className="item__details__last-sale">
                    Last sale: {parseFloat(item.lastSale).toFixed(2)} ETH
                  </span>
                </div>
                <div className="item__see-more">
                  <button className="item__see-more__button">See More</button>
                  <div className="item__see-more__icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {visible < items.length && (
        <button
          className="collection-page__button"
          onClick={() => setVisible((prev) => prev + 6)}
        >
          Load more
        </button>
      )}
    </section>
  );
}
