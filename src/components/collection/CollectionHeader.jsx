import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton.jsx";

export default function CollectionHeader({ collection, loading }) {
  if (loading) {
    return (
      <header id="collection-header" style={{ backgroundColor: "#e5e5e5" }}>
        <div className="row collection-header__row">
          <div className="collection-header__content"></div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url(${collection.imageLink})`,
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={collection.logo}
              alt={collection.imageLink}
              className="collection-header__img"
            />
            <div className="collection-header__name">{collection.title}</div>
            <Link
              to={`/user/${collection.creatorId}`}
              className="collection-header__author"
            >
              {collection.creator}
            </Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.totalVolume}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {parseFloat(collection.floor).toFixed(2)}
                  </span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">
                    {parseFloat(collection.bestOffer).toFixed(2)}
                  </span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.listed}%</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.owners}</span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
