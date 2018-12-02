import React from "react";
import { Button } from "./Button";
import { HeadingText } from "./../components/common.styles";

export const FilterInput = ({
  username,
  filters = [],
  onAddFilter,
  onRemoveFilter,
  handleRemoveUsername
}) => {
  const handleChange = ({ keyCode, target }) => {
    const { value } = target;
    if (keyCode === 13 && value) {
      onAddFilter({ username, filter: value });
      if (newFilterInput) {
        newFilterInput.value = "";
      }
    }
  };
  let newFilterInput;
  return (
    <div className="mb3 flex flex-column">
      <div className="flex justify-between items-center mb2">
        <p className="bold mr2">@{username}</p>
        <Button onClick={() => handleRemoveUsername(username)}>Unfollow</Button>
      </div>

      {filters.map(f => {
        return (
          <div key={f} className="flex items-center mb1">
            <input type="text" readOnly value={f} />
            <Button
              className="ml1"
              onClick={() => onRemoveFilter({ username, filter: f })}
            >
              {"\u00d7"}
            </Button>
          </div>
        );
      })}
      <input
        ref={el => (newFilterInput = el)}
        type="text"
        placeholder="New filter"
        onKeyDown={handleChange}
      />
    </div>
  );
};
