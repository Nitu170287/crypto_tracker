import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./style.css";

const PriceToggle = ({ priceType, handlePriceChange }) => {
  return (
    <div className="price-toggle">
      <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={handlePriceChange}
        sx={{
          "&.Mui-selected": {
            color: "var(--orange) !important",
          },
          borderColor: "var(--orange)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "var(--orange)",
            color: "var(--orange) !important",
          },
        }}
      >
        <ToggleButton value="prices" className="toggle-btn">
          Prices
        </ToggleButton>
        <ToggleButton value="market_caps" className="toggle-btn">
          Market Caps
        </ToggleButton>
        <ToggleButton value="total_volumes" className="toggle-btn">
          Total Volumes
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default PriceToggle;
