import React, { useState } from 'react';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
} from '@material-ui/core';
import {
  CloseOutlined as CloseOutlinedIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './searchBar.styles';

interface SearchBarProps extends QuestComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  theme,
  onSearch,
  ...props
}) => {
  const classes = useStyles();

  const [isFocused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSearchCancel = () => {
    setSearchTerm('');
    setFocused(false);
  };

  const onFocusLoss = (): void => {
    setFocused(false);
  };

  return (
    <ClickAwayListener onClickAway={onFocusLoss}>
      <Box
        className={classes.search}
        borderRadius={theme!.shape.borderRadius}
        bgcolor={
          isFocused
            ? theme!.palette.background.default
            : theme!.palette.background.paper
        }
        boxShadow={isFocused ? 2 : 0}
        height="3rem"
        {...props}
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
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setSearchTerm(event.target.value)}
          onKeyDown={(
            event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            if (event.key === 'Enter') {
              onSearch(searchTerm);
              setFocused(false);
            }
          }}
        />
        {isFocused ? (
          <IconButton hidden={!isFocused} onClick={onSearchCancel}>
            <CloseOutlinedIcon htmlColor={theme!.custom.icon.iconColor} />
          </IconButton>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
