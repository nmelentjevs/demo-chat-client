import React, { useState } from 'react';
import { Button, Grow, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './search.scss';

const Search = ({ messages }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const handleSearchMessage = () => {
    const matched = messages.map(msg =>
      !msg.system && msg.message.toLowerCase().match(`${search.toLowerCase()}`)
        ? true
        : false
    );

    const indeces = matched
      .map((found, index) => {
        if (found) return index;
        return found;
      })
      .filter(found => (found === 0 || found ? true : false));

    if (indeces.length) {
      const scrollToFound = childId => {
        const child = document.getElementById(`message-${childId}`);
        child.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
        const intersectionObserver = new IntersectionObserver(entries => {
          let [entry] = entries;
          if (entry.isIntersecting) {
            setTimeout(() => child.firstChild.classList.add('found'), 100);
            setTimeout(() => child.firstChild.classList.remove('found'), 600);
          }
        });
        // start observing
        intersectionObserver.observe(child);
      };

      scrollToFound(indeces[currentIndex]);
      if (currentIndex === indeces.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setNotFound(true);
      function searchWarningClose() {
        this.removeEventListener('keydown', searchWarningClose, false);
        setNotFound(false);
      }
      window.addEventListener('keydown', searchWarningClose, false);
    }
  };

  return (
    <>
      <div className="search">
        {!open ? (
          <Button onClick={() => setOpen(true)}>
            <SearchIcon />
          </Button>
        ) : (
          <>
            <Grow in={open}>
              <div className="search__box">
                <input
                  className="search__input"
                  value={search}
                  placeholder="Search Message"
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (search) {
                        handleSearchMessage({ enter: true });
                      }
                    }
                  }}
                />
              </div>
            </Grow>
            {!search ? (
              <Button onClick={() => setOpen(false)}>
                <CloseIcon />
              </Button>
            ) : (
              <Button onClick={handleSearchMessage}>
                <SearchIcon />
              </Button>
            )}
          </>
        )}
      </div>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notFound}
      >
        <Alert severity="warning">No messages has been found.</Alert>
      </Snackbar>
    </>
  );
};

export default Search;
