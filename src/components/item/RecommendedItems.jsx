import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CollectionGrid from "../collection/CollectionGrid.jsx";
import axios from "axios";
import Skeleton from "../ui/Skeleton.jsx";

export default function RecommendedItems({ collectionId, currentItemId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionId) return;
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`,
        );
        const collectionItems = (data.data.items || []).map((item) => ({
          ...item,
          collectionId: data.data.id,
          id: item.itemId,
          floor: item.price,
          totalVolume: item.lastSale,
          imageLink: item.imageLink,
          title: item.title,
        }));

        setItems(collectionItems.filter((item) => item.id !== currentItemId));
      } catch (error) {
        console.log("Failed to fetch recommended items", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [collectionId, currentItemId]);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              {loading ? (
                <Skeleton width="160px" height="1.2rem" borderRadius="4px" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faTableCells} />
                  <h3 className="recommended-items__header__title">
                    More from this collection
                  </h3>
                </>
              )}
            </div>
            <CollectionGrid
              collections={items}
              loading={loading}
              slider
              linkPrefix="/item"
              isItemCard
            />
            <div className="recommended-items__footer">
              {loading ? (
                <Skeleton width="100px" height="2rem" borderRadius="6px" />
              ) : (
                <Link
                  to={`/collection/${collectionId}`}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
