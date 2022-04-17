import React from "react";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";
import { searchNote } from "../../store/NoteList/Actions";
import "./_SearchBar.scss";

class SearchBarInternal extends React.Component {
  state = {
    searchValue: "",
  };

  changeSearchValue(text) {
    this.setState({ searchValue: text });
  }

  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          type="search"
          placeholder="Поиск"
          onChange={(event) =>
            this.changeSearchValue(event.target.value.trim().toLowerCase())
          }
        />
        <input
          className="search__btn"
          type="button"
          value="Search"
          onClick={() =>
            this.props.store.dispatch(searchNote(this.state.searchValue))
          }
        />
      </div>
    );
  }
}

export const SearchBar = storeContextHOC(SearchBarInternal);
