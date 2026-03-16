import React from "react";
import Skeleton from "../ui/Skeleton.jsx";

export default function CollectionInfo({ collection, loading }) {
  if (loading) {
    return (
      <section id="collection-info">
        <div className="row">
          <div className="collection-info__wrapper">
            <Skeleton width="100%" height="1rem" borderRadius="4px" />
            <Skeleton width="80%" height="1rem" borderRadius="4px" />
            <Skeleton width="60%" height="1rem" borderRadius="4px" />
            <div className="collection-info__details" style={{ marginTop: "1rem" }}>
              <Skeleton width="300px" height="1rem" borderRadius="4px" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">
            {collection.description}
          </p>
          <div className="collection-info__details">
            <span className="collection-info__detail">
              Items
              <span className="collection-info__detail__data"> {collection.items?.length}</span>
            </span>
            ·
            <span className="collection-info__detail">
              Created
              <span className="collection-info__detail__data"> {collection.createdDate}</span>
            </span>
            ·
            <span className="collection-info__detail">
              Creator earnings
              <span className="collection-info__detail__data"> {collection.creatorEarnings}%</span>
            </span>
            ·
            <span className="collection-info__detail">
              Chain
              <span className="collection-info__detail__data"> {collection.chain}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
