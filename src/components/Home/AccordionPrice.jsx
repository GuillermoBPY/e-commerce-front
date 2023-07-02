import React from "react";
import Swal from "sweetalert2";

const AccordionPrice = ({ setIsActivePrice, isActivePrice, setfromto }) => {
  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const pricefrom = Number(e.target.pricefrom.value.trim());
    const priceto = Number(e.target.priceto.value.trim());
    if (pricefrom > priceto && priceto !== 0) {
      Swal.fire({
        scrollbarPadding: false,
        icon: "error",
        title: "Oops...",
        html: "The price <b>From</b> must be lower than price <b>To</b>",
      });
    } else {
      setfromto({
        pricefrom: pricefrom,
        priceto: priceto === 0 ? Infinity : priceto,
      });
    }
  };

  const accordionData2 = {
    title2: "Price",
    content2: (
      <section>
        <form onSubmit={handleSubmitPrice}>
          <div>
            <label htmlFor="pricefrom">From</label>
            <input placeholder="0" type="number" id="pricefrom" />
          </div>
          <div>
            <label htmlFor="priceto">To</label>
            <input placeholder="0" type="number" id="priceto" />
          </div>
          <button>Filter Price</button>
        </form>
      </section>
    ),
  };
  const { title2, content2 } = accordionData2;

  return (
    <section>
      <div>
        <React.Fragment>
          <div className="accordion">
            <div className="accordion-item">
              <div
                className="accordion-title"
                onClick={() => setIsActivePrice(!isActivePrice)}
              >
                <div>{title2}</div>
                <div>
                  <i className="bx bxs-chevron-down"></i>
                </div>
              </div>
              {isActivePrice && (
                <div className="accordion-content">{content2}</div>
              )}
            </div>
          </div>
        </React.Fragment>
      </div>
    </section>
  );
};

export default AccordionPrice;
