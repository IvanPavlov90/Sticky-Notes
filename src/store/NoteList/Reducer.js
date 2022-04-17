const initialState = {
  notes: [],
  filterNotes: new Set(),
  searchMode: false,
  searchValue: '',
}

function reducerItem (state = initialState, action) {
    switch (action.type) {
      case 'get_notes':
        return {...state, notes: [...action.payload.notes], loading: action.payload.loading};
      case 'add_note':
        return {...state, notes: [action.payload, ...state.notes]};
      case 'edit_note':
        const editState = Object.assign({}, state);
        if (editState.searchMode) {
          const editIndex = editState.filterNotes.findIndex(elem => elem.id === action.payload.id);
          const editObj = editState.filterNotes.splice(editIndex, 1);
          editObj[0] = {...editObj[0], header: action.payload.header, text: action.payload.text, color: action.payload.color};
        }
        const editIndex = editState.notes.findIndex(elem => elem.id === action.payload.id);
        const editObj = editState.notes.splice(editIndex, 1);
        editObj[0] = {...editObj[0], header: action.payload.header, text: action.payload.text, color: action.payload.color};
        return {...state, notes: [...editObj, ...editState.notes], filterNoes: [...editObj, ...editState.filterNotes]};
      case 'delete_note':
        const deleteState = Object.assign({}, state);
        deleteState.notes = deleteNoteFromNoteStorage(deleteState.notes, action.payload.id);
        if (deleteState.searchMode) {
          deleteState.filterNotes = deleteNoteFromNoteStorage(deleteState.filterNotes, action.payload.id);
        }
        return {...state, notes: [...deleteState.notes], filterNotes: [...deleteState.filterNotes]};  
      case 'search':
        if (action.payload.searchMode) {
          const searchState = Object.assign({}, state);
          searchState.filterNotes = addSearchNotesToSet(searchState.notes, action.payload.searchValue)
          searchState.searchMode = action.payload.searchMode;
          searchState.searchValue = action.payload.searchValue;
          return {...state, filterNotes: [...searchState.filterNotes], searchMode: searchState.searchMode, searchValue: searchState.searchValue}; 
        } else if (!action.payload.searchMode) {
          return {...state, searchMode: action.payload.searchMode};
        }
        return state;
      default:
        return state;
    }
}

function addSearchNotesToSet (notes, searchValue) {
  const searchValues = new Set();
  const headerFilter = notes.filter((note) => note.header.toLowerCase().indexOf(searchValue) !== -1);
  const textFilter = notes.filter((note) => note.text.toLowerCase().indexOf(searchValue) !== -1);
  headerFilter.forEach(note => {
    searchValues.add(note);
  });
  textFilter.forEach(note => {
    searchValues.add(note);
  });
  return searchValues;
}

function deleteNoteFromNoteStorage(notesArray, id) {
  const deleteIndex = notesArray.findIndex(elem => elem.id === id);
  notesArray.splice(deleteIndex, 1);
  return notesArray;
}

export { reducerItem };