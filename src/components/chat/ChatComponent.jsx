import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ThemeProvider,
  FixedWrapper,
  TitleBar,
  IconButton,
  CloseIcon,
  Message,
  MessageText,
  MessageButtons,
  MessageButton,
  TextInput,
  TextComposer,
  SendButton,
  Row,
  MessageList,
} from '@livechat/ui-kit';
import moment from 'moment';
import { dateTimeFormat, timeFormat } from '../../constants/project-constants';

const ChatComponent = (props) => {
  console.log('This is all props i receve chat', props);
  return (
    <ThemeProvider
      theme={{
        AgentBar: { Avatar: { css: { color: '#000', fontWeight: 'bold' } } },
      }}
    >
      <FixedWrapper.Root maximizedOnInit>
        {props.showChat ? (
          <FixedWrapper.Maximized>
            <Maximized {...props} />
          </FixedWrapper.Maximized>
        ) : (
          <span style={{ display: 'none' }} />
        )}
        <FixedWrapper.Minimized>
          <Minimized />
        </FixedWrapper.Minimized>
      </FixedWrapper.Root>
    </ThemeProvider>
  );
};

ChatComponent.propTypes = {
  showChat: PropTypes.bool,
};

const renderMessages = (message) => {
  if (message.type === 'text') {
    return (
      <MessageText
        style={{
          backgroundColor: 'rgb(250, 120, 22)',
          //padding: 10,
          borderRadius: 5,
          color: '#fff',
        }}
      >
        {message.message}
      </MessageText>
    );
  } else if (message.type === 'audio') {
    return (
      <div>
        <audio controls>
          <source src={message.media} type="audio/mpeg" />
        </audio>
      </div>
    );
  } else if (message.type === 'location') {
    return (
      <Message>
        <MessageButtons>
          <MessageButton
            style={{ backgroundColor: 'white', color: 'red' }}
            label="Click to see location"
            onClick={() => window.open(message.message, '_blank')}
          />
        </MessageButtons>
      </Message>
    );
  }
};

/**
 *
 * Maximized Component
 */
const Maximized = (props) => {
  const { transporter } = props;

  return (
    <div className="chat-main-container" minimize={'false'}>
      <TitleBar
        className="chat-title-bar"
        title="Messages"
        rightIcons={[
          <IconButton key="close">
            <CloseIcon onClick={props.onClick} />
          </IconButton>,
        ]}
        style={{ backgroundColor: '#152972' }}
      />
      <div
        className="chat-container"
        id="chat-container"
        style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}
      >
        <MessageList>
          {props.messages.map((message, index) => {
            if (message.sender === transporter._id) {
              return (
                <Row
                  // style={{ alignItems: 'flex-end' }}
                  className="left-chat"
                  key={`${message.date.toString()}-${index}`}
                >
                  {/* <Avatar
                  isOwn
                  letter={message.userName.slice(0, 1)}
                  style={{ backgroundColor: '#4e51a97d', color: '#fff' }}
                /> */}
                  <span
                    style={{
                      padding: '4px 5px',
                      color: '#152972',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    {`${message.userName.split(' ')[0]}, ${moment(
                      message.date
                    ).format(timeFormat)}`}
                  </span>
                  <Message isOwn>{renderMessages(message)}</Message>
                </Row>
              );
            } else {
              return (
                <Row
                  key={`${message.date.toString()}-${index}`}
                  className="right-chat"
                >
                  <span
                    style={{
                      padding: '4px 5px',
                      color: '#152972',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    {moment(message.date).format(dateTimeFormat)}
                  </span>
                  <Message isOwn>{renderMessages(message)}</Message>
                </Row>
              );
            }
          })}
        </MessageList>
      </div>
      {props.canSendMessage ? (
        <TextComposer onSend={props.sendMessage} className="send-message">
          <Row align="center">
            <TextInput fill="true" style={{ fontFamily: "'Exo2-Medium'" }} />
            <IconButton key="location">
              <i
                className="fas fa-map-marker-alt"
                title="Click to send location"
                aria-hidden="true"
                onClick={props.handleShareLocation}
              ></i>
            </IconButton>
            {props.isRecording ? (
              <div>
                <IconButton key="close">
                  <CloseIcon onClick={props.handleRemoveRecording} />
                </IconButton>
                <IconButton key="audio">
                  <i
                    className="fas fa-microphone"
                    title="Click to send voice"
                    style={{ color: 'red' }}
                    aria-hidden="true"
                    onClick={props.handleStopRecording}
                  ></i>
                </IconButton>
              </div>
            ) : (
              <IconButton key="audio">
                <i
                  className="fas fa-microphone"
                  title="Click to Record voice"
                  aria-hidden="true"
                  onClick={props.handleStartRecording}
                ></i>
              </IconButton>
            )}

            <SendButton fit />
          </Row>
        </TextComposer>
      ) : null}
    </div>
  );
};

Maximized.propTypes = {
  user: PropTypes.shape(),
  onClick: PropTypes.func,

  sendMessage: PropTypes.func,
  canSendMessage: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object),
};

/**
 *
 * Minimized Component
 */
const Minimized = () => {
  return null;
};

Minimized.propTypes = {
  maximize: PropTypes.func,
};

export default ChatComponent;
