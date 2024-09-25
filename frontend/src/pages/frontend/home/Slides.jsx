import React, { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";
export default function Slides() {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BannerService.index();
        console.log("", result);
        setBanners(result.banners);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await BannerService.index();
      console.log("🚀 ~ res:", res);
      setBanners(res.banners);
    })();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="hdl-slideshow">
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {banners.map((banner, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <img
                      style={{ height: "600px" }}
                      src={urlImage + "banner/" + banner.image}
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handlePrev}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleNext}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
