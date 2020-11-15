import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

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
  MessageList
} from '@livechat/ui-kit';
import moment from 'moment';
import { authClass } from '../../utils/auth.util';
import ApiCalls from '../../service/RequestHandler';
import { importFirebase } from '../../utils/functions';
import { withStore } from '../../utils/store.util';
import MicRecorder from 'mic-recorder-to-mp3';
import * as authUtil from '../../utils/auth.util';
import { dateTimeFormat, timeFormat } from '../../constants/project-constants';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class CustomerSupportChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      activity: false,
      isRecording: false,
      audioUrl: '',
      isBlocked: false,
      user: "",
      canSendMessage: true
    };
  }

  async componentDidMount() {
    const user = await authUtil.getUser();
    this.setState({ user });
    this.handleInitiateSupport();
    navigator.getUserMedia({ audio: true },
      () => {

        this.setState({ isBlocked: false });
      },
      () => {

        this.setState({ isBlocked: true })
      },
    );
  }


  async handleInitiateSupport() {
    const { user } = this.state;
    const props = {
      [user.userType]: user._id
    }
    try {
      const response = await ApiCalls.initiateSupport(props);
      this.handleFirebase(response.data._id);
    } catch (error) {
      this.setState({ activity: false });

    }

  }




  async handleFirebase(id) {
    console.log("THis is the all id", id)
    const { database } = await importFirebase();
    this.messageRef = database()
      .ref('messages')
      .child(id);

    this.messageRef.on('value', message => {
      if (message.val()) {
        this.setState({
          messages: Object.values(message.val())
        });
      }
    });
  }

  onShareCurrentLocation = async () => {
    const location = await authUtil.getCurrentLocation()
    const ShareLocationUrl = `https://www.google.com/maps/place/${location[1]},${location[0]}`
    this.handleSendLocationMessage(ShareLocationUrl);
  };

  onStartVoiceRecord = () => {
    if (this.state.isBlocked) {

    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  onStopVoiceRecord = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const audioFile = this.createFile(blob);
        const audioUrl = await this.uploadFile(audioFile)
        this.handleSendAudioMessage(audioUrl.path);
        this.setState({ audioUrl: audioUrl.path, isRecording: false });
      }).catch((e) => console.log(e));
  };

  onRemoveVoiceRecord = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        this.setState({ isRecording: false });
      }).catch((e) => console.log(e));
  };


  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await ApiCalls.uploadTFile(formData);
    return { path: response.data.path, stateKey: file.stateKey };
  }

  createFile = (file) => {
    var d = new Date();
    var n = d.getTime()
    const fileName = "uploaded_file.mp3" + n
    var newfile = new File([file], fileName, { type: "audio/mpeg", lastModified: Date.now() })
    return newfile;
  }

  handleSendMessage = message => {
    if (message) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "text"
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendLocationMessage = message => {
    if (message) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "location"
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendAudioMessage = audio => {
    if (audio) {
      const newItem = {
        userName:
          authClass.getUser.firstName + ' ' + authClass.getUser.lastName,
        message: "audio",
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: 'pending',
        type: "audio",
        media: audio
      };
      this.messageRef.push(newItem);
    }
  };

  /**
 *
 * Maximized Component
 */
  Maximized = props => {
    const { messages, user, canSendMessage, isRecording } = this.state

    return (
      <div className="chat-main-container" minimize={'false'}>
        <TitleBar
          className="chat-title-bar"
          title="Live Chat"
          rightIcons={[
            <IconButton key="close">
              <CloseIcon onClick={this.props.handleToggleChat} />
            </IconButton>
          ]}
          style={{ backgroundColor: '#152972' }}
        />
        <div
          className="chat-container"
          id="chat-container"
          style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}
        >
          <MessageList>
            {messages.map((message, index) => {
              if (message.sender === user._id) {
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
                        fontSize: '0.8rem'
                      }}
                    >
                      {moment(message.date).format(dateTimeFormat)}
                    </span>
                    <Message isOwn>
                      {renderMessages(message)}
                    </Message>
                  </Row>
                );
              } else {
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
                        fontSize: '0.8rem'
                      }}
                    >
                      {`${message.userName.split(' ')[0]}, ${moment(
                        message.date
                      ).format(timeFormat)}`}
                    </span>
                    <Message isOwn>
                      {renderMessages(message)}
                    </Message>
                  </Row>
                );
              }
            })}
          </MessageList>
        </div>
        {
          canSendMessage ? (
            <TextComposer onSend={this.handleSendMessage} className="send-message">
              <Row align="center">
                <TextInput fill="true" style={{ fontFamily: "'Exo2-Medium'" }} />
                <IconButton key="location">
                  <i className="fas fa-map-marker-alt" title="Click to send location" aria-hidden="true" onClick={this.onShareCurrentLocation}></i>
                </IconButton>
                {isRecording ? (
                  <div>
                    <IconButton key="close">
                      <CloseIcon onClick={this.onRemoveVoiceRecord} />
                    </IconButton>
                    <IconButton key="audio">
                      <i className="fas fa-microphone" title="Click to send voice" style={{ color: "red" }} aria-hidden="true" onClick={this.onStopVoiceRecord}></i>
                    </IconButton>
                  </div>
                ) : (
                    <IconButton key="audio">
                      <i className="fas fa-microphone" title="Click to Record voice" aria-hidden="true" onClick={this.onStartVoiceRecord}></i>
                    </IconButton>
                  )}

                <SendButton fit />
              </Row>
            </TextComposer>
          ) : null
        }
      </div >
    );
  };


  render() {
    console.log("this is the all props i receive here", this.props)
    return (
      <ThemeProvider
        theme={{
          AgentBar: { Avatar: { css: { color: '#000', fontWeight: 'bold' } } }
        }}
      >
        <FixedWrapper.Root maximizedOnInit>
          {this.props.showChat ? (
            <FixedWrapper.Maximized>
              <this.Maximized {...this.props} />
            </FixedWrapper.Maximized>
          ) : (
              <span style={{ display: 'none' }} />
            )}
          <FixedWrapper.Minimized>
            <Minimized />
          </FixedWrapper.Minimized>
        </FixedWrapper.Root>
      </ThemeProvider >
    );
  }
};

CustomerSupportChatComponent.propTypes = {
  showChat: PropTypes.bool
};

const renderMessages = (message) => {
  if (message.type === "text") {
    return (
      <MessageText
        style={{
          backgroundColor: 'rgb(250, 120, 22)',
          //padding: 10,
          borderRadius: 5,
          color: '#fff'
        }}
      >
        {message.message}
      </MessageText>
    )
  }
  else if (message.type === "audio") {
    return (
      <div>
        <audio controls>
          <source src={message.media} type="audio/mpeg" />
        </audio>
      </div>
    )
  }
  else if (message.type === "location") {
    return (

      <Message>
        <MessageButtons>
          <MessageButton style={{ backgroundColor: "white", color: "red" }} label="Click to see location" onClick={() => window.open(message.message, '_blank')} />
        </MessageButtons>
      </Message>

    )
  }
}



// Maximized.propTypes = {
//   user: PropTypes.shape(),
//   onClick: PropTypes.func,

//   sendMessage: PropTypes.func,
//   canSendMessage: PropTypes.bool,
//   messages: PropTypes.arrayOf(PropTypes.object)
// };

/**
 *
 * Minimized Component
 */
const Minimized = () => {
  return null;
};

Minimized.propTypes = {
  maximize: PropTypes.func
};

export default withStore(CustomerSupportChatComponent);