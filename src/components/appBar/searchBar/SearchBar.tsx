import React, { useState } from 'react';
import {
  Search as SearchIcon,
  CloseOutlined as CloseOutlinedIcon,
} from '@material-ui/icons';
import {
  Box,
  InputBase,
  IconButton,
  Snackbar,
  ClickAwayListener,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './searchBar.styles';

const SearchBar: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isFocused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowingToast, showToast] = useState(false);

  const onSearchCancel = () => {
    setSearchTerm('');
    setFocused(false);
  };

  const onSearch = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFocused(true);
    if (event.key === 'Enter') {
      showToast(true);
      setFocused(false);
    }
  };

  const onFocusLoss = (): void => {
    setFocused(false);
  };

  const handleToastClose = (): void => {
    showToast(false);
  };

  return (
    <ClickAwayListener onClickAway={onFocusLoss}>
      <Box
        className={classes.search}
        borderRadius={theme.shape.borderRadius}
        bgcolor={
          isFocused
            ? theme.palette.background.default
            : theme.palette.background.paper
        }
        boxShadow={isFocused ? 2 : 0}
        height="3rem"
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchTerm}
          onClick={() => setFocused(true)}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={onSearch}
        />
        {isFocused ? (
          <IconButton hidden={!isFocused} onClick={onSearchCancel}>
            <CloseOutlinedIcon htmlColor={theme.custom.icon.iconColor} />
          </IconButton>
        ) : null}
        <Snackbar
          open={isShowingToast}
          message="to do"
          autoHideDuration={2000}
          onClose={handleToastClose}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
