import axios from "axios";
import React, { useEffect } from "react";

const AccordionCategories = ({
  setfilteredProducts,
  categories,
  setcategories,
  isActive,
  setIsActive,
}) => {
  const getAllCategories = () => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/categories`;

    axios
      .get(url)
      .then((res) => setcategories(res.data))
      .catch((err) => err);
  };
  const getProductsByName = (data = "title=") => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/products?${data}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => setfilteredProducts(res.data))
      .catch((err) => err);
  };

  const handleClick = (categoryId) => {
    getProductsByName(`categoryId=${categoryId}`);
  };
  const accordionData = {
    title: "Categories",
    content: (
      <ul>
        <li
          onClick={() => {
            setfilteredProducts();
          }}
        >
          All Products
        </li>
        {categories?.map((categorie) => (
          <li
            onClick={() => {
              handleClick(categorie.id);
            }}
            key={categorie.id}
          >
            {categorie.name}
          </li>
        ))}
      </ul>
    ),
  };
  const { title, content } = accordionData;
  useEffect(getAllCategories, []);

  return (
    <section>
      <div>
        <React.Fragment>
          <div className="accordion">
            <div className="accordion-item">
              <div
                className="accordion-title"
                onClick={() => setIsActive(!isActive)}
              >
                <div>{title}</div>
                <div>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              {isActive && (
                <div className="accordion-content">
                  {content}
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      </div>
    </section>
  );
};

export default AccordionCategories;
