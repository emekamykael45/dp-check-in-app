import FormInput from "./form-input";

import Icon from "../assets/svg";

const Search = ({ onSearch }) => {
  return (
    <div className="search_container">
      <Icon name="search" />

      <FormInput
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
