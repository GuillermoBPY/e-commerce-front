import React, { useState } from "react";
import "./styles/SliderImgs.css";

const SliderImgs = ({ product }) => {
  const { productImgs } = product;
  const [imgSelected, setimgSelected] = useState(0);

  const styleMovement = {
    transform: `translateX(Calc(-${imgSelected}/3 * 100%))`,
  };

  const handlePrevius = () => {
    if (imgSelected === 0) {
      return;
    }
    if (imgSelected - 1 < 0) {
      setimgSelected(productImgs.length - 1);
    } else {
      setimgSelected(imgSelected - 1);
    }
  };

  const handleNext = () => {
    if (imgSelected === 2) {
      return;
    }
    if (imgSelected + 1 > productImgs.length - 1) {
      setimgSelected(0);
    } else {
      setimgSelected(imgSelected + 1);
    }
  };

  return (
    <div className="carousel">
      <div className="slider">
        <button
          onClick={handlePrevius}
          className="sliderbx sliderbxleft"
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <div
          style={styleMovement}
          className="slider__movable"
        >
          {productImgs?.map((image) => (
            <div
              key={image.id}
              className="slider__container--img"
            >
              <img
                className="slider__img"
                src={image.url}
                alt={image.url}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="sliderbx sliderbxright"
        >
          <i className="bx bx-chevron-right"></i>
        </button>
        <div className="slider__header"></div>
      </div>
      <div className="carousel__footer">
        {productImgs?.map((image, index) => (
          <div
            key={image.id}
            className={`carousel__container--img ${
              index === imgSelected && "active-img"
            }`}
            onClick={() => setimgSelected(index)}
          >
            <img
              className="carousel__img"
              src={image.url}
              alt={image.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderImgs;
