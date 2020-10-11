import React from 'react';
import TextField from '@material-ui/core/TextField';

function SearchBar() {
    return (
        <TextField
            id="outlined-basic" label="Search" variant="outlined"
            style={{ width: '300px', margin: '25px', input: { margin: 5 } }}
            size="small"
        />
    );
}

export default SearchBar;