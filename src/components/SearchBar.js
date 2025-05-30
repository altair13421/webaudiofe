import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background-color: var(--terminal-black);
  color: var(--terminal-green);
  border: 1px solid var(--terminal-green);
  padding: 8px 12px;
  font-family: var(--terminal-font);
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
  outline: none;

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }

  &:focus {
    box-shadow: var(--terminal-glow);
  }

  /* Blinking cursor effect */
  &::after {
    content: "_";
    animation: blink 1s infinite;
  }
`;

const Prompt = styled.span`
  color: var(--terminal-green);
  margin-right: 10px;
  font-family: var(--terminal-font);
  &:before {
    content: "> search:";
  }
`;

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <Prompt />
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search music or artists..."
          spellCheck="false"
        />
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
