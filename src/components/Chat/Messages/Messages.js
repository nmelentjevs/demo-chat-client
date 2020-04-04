import React, { useEffect, useRef } from 'react';
import {
  List,
  ListItem,
  Fade,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import './messages.scss';

const Messages = ({ messages, currentUser }) => {
  const lastMessage = useRef(null);

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [messages]);

  return (
    <List>
      <InfiniteScroll
        dataLength={messages.length}
        height="75vh"
        className="messages-scroll"
      >
        {!messages.length ? (
          <div className="system-message">
            <div className="messages">
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ fontSize: '16px' }}
              >
                New messages will appear here
              </Typography>
            </div>
          </div>
        ) : (
          messages.map(({ message, user, createdAt, system }, index) => {
            const isMine = user ? user.id === currentUser.id : false;

            return (
              <Fade in key={index} ref={lastMessage}>
                <div
                  id={`message-${index}`}
                  className={
                    !system
                      ? isMine
                        ? 'my-message'
                        : 'received-message'
                      : 'system-message'
                  }
                >
                  <div className="messages">
                    <ListItem
                      alignItems="center"
                      justify="space-between"
                      style={{ textAlign: 'center' }}
                    >
                      {user ? (
                        <ListItemAvatar>
                          <Avatar
                            alt="Cute Dog"
                            src={user.avatar}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </ListItemAvatar>
                      ) : null}
                      {!system ? (
                        <ListItemText
                          primary={message}
                          primaryTypographyProps={{
                            style: {
                              fontSize: '18px'
                            }
                          }}
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              by {user.nickname}
                            </Typography>
                          }
                        />
                      ) : (
                        <ListItemText primary={`${message} - ${createdAt}`} />
                      )}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-15px',
                          right: 0
                        }}
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {createdAt}
                        </Typography>
                      </span>
                    </ListItem>
                  </div>
                </div>
              </Fade>
            );
          })
        )}
      </InfiniteScroll>
    </List>
  );
};

export default Messages;
