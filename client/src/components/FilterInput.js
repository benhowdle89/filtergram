import React from "react";
import { Button } from "./Button";

export const FilterInput = ({
  username,
  filters = [],
  onAddFilter,
  onRemoveFilter,
  handleRemoveUsername
}) => {
  const handleAdd = () => {
    let { value } = newFilterInput;
    if (value) {
      value = value.replace(/\s.*/, "");
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
        <p className="bold">@{username}</p>
        <Button destructive onClick={() => handleRemoveUsername(username)}>
          Unfollow
        </Button>
      </div>

      {filters.map(f => {
        return (
          <div key={f} className="flex items-center mb1">
            <input type="text" readOnly value={f} />
            <Button
              className="ml1"
              destructive
              onClick={() => onRemoveFilter({ username, filter: f })}
            >
              {"\u00d7"}
            </Button>
          </div>
        );
      })}
      <div className="flex justify-between items-center mb2">
        <input
          ref={el => (newFilterInput = el)}
          type="text"
          placeholder="ie. food"
          onKeyDown={({ keyCode }) => {
            if (keyCode === 13) handleAdd();
          }}
        />
        <Button className="ml1" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};
