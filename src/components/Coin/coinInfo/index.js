import { useState } from "react";
import "./style.css";

const CoinInfo = ({ heading, desc,mode }) => {
  const shortDesc =
    desc.slice(0, 350) + "<p style='color:var(--grey)'> Read more...</p>";
  const longdesc = desc + "<p style='color:var(--grey)'> Read less...</p>";

  const [flag, setFlag] = useState(false);

  return (
    <div className={"grey-wrapper-"+mode}>
      <h2 className="coin-info-heading">{heading}</h2>
      {desc.length > 350 ? (
        <p
          onClick={() => setFlag(!flag)}
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longdesc }}
        ></p>
      ) : (
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      )}
    </div>
  );
};
export default CoinInfo;
