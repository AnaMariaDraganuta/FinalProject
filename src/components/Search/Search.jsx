import { HiOutlineSearch, HiMinusCircle } from "react-icons/hi";
import { useState } from 'react';
import PropTypes from 'prop-types';

import './Search.css'

export default function Search({ setSearchTerm }) {
  let [term, setTerm] = useState('');

  function clearSearch() {
    setTerm('');
    setSearchTerm('');
  }

  function updateSearchTerm(event) {
    setTerm(event.target.value);
    setSearchTerm(event.target.value);
  }

  return (
    <div className="search-container">
      <HiOutlineSearch className="search-icon" />
      <input
        onChange={updateSearchTerm}
        placeholder="Search "
        type="text"
        value={term}
      />
      <HiMinusCircle className="clear-icon" onClick={clearSearch} />
    </div>
  );
}

Search.propTypes = {
  setSearchTerm: PropTypes.func,
};