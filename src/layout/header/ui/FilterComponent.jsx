import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useContext } from "react";
import searchContext from "../../../store/searchContext";

const FilterComponent = () => {
  const { search, setSearch } = useContext(searchContext);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search || ""}
        onChange={handleInputChange}
      />
    </Search>
  );
};
export default FilterComponent;
