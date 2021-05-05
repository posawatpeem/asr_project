import React, { useState } from 'react'
import {makeStyles, createStyles} from '@material-ui/core'
import {Input} from 'antd';

const { TextArea } = Input;

export default function Client() {
  const [p, setP] = useState(null);
  const [dc, setDc] = useState(null);
  const classes = useStyles();

  const [message, setMessage] = useState([])

  const config = {
    sdpSemantics: 'unified-plan'
  };

  const negotiate = (peer) => {
    return peer.createOffer().then((offer) =>{
      return peer.setLocalDescription(offer);
    }).then(() => {
      return new Promise((resolve) => {
        if (peer.iceGatheringState === 'complete') {
          resolve();
        } else {
          function checkState() {
            if (peer.iceGatheringState === 'complete') {
              peer.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          }

          peer.addEventListener('icegatheringstatechange', checkState);
        }
      });
    }).then(() => {
      let offer = peer.localDescription;
      console.log(offer.sdp);
      return fetch('/offer', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }).then((response) => {
      return response.json();
    }).then((answer) => {
      console.log(answer.sdp);
      return peer.setRemoteDescription(answer);
    }).catch((e) => {
      console.log(e);
    });
  }

  const startVoice = () => {
    let dcInterval = null
    let globalMessage = [];
    let timelimit = 2
    const peer = new RTCPeerConnection(config)
    setP(peer)
    let param = {}
    const cD = peer.createDataChannel('chat', param)
    setDc(cD)
    cD.onclose = () => {
      clearInterval(dcInterval)
      console.log('Closed data channel');
      console.log(globalMessage)
      console.log(globalMessage.length-1)
      setMessage(globalMessage[globalMessage.length-1])
      
    }

    cD.onopen = () => {
      console.log('Opened data channel');
    }
    cD.onmessage = (evt) => {
      if (timelimit!==0) {
        if (evt.data.trim() !== "") {
          globalMessage.push(evt.data);
          timelimit = 2
        }
        else {
          timelimit = timelimit-1
        }
      }
      else {
        stopVoice(peer)
      }
    };

    peer.oniceconnectionstatechange = () => {
      if (peer.iceConnectionState === 'disconnected') {
        console.log('Disconnected');
      }
    }

    const constraints = {
      audio: true,
      video: false
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });
      return negotiate(peer);
    }, (err) => {
      console.log('Could not acquire media: ' + err);
    });


  }

  const stopVoice = (peer) => {
    
    // close data channel
    if (dc) {
      dc.close();
    }

    // close transceivers
    if (peer.getTransceivers) {
      p.getTransceivers().forEach((transceiver) => {
        if (transceiver.stop) {
          transceiver.stop();
        }
      });
    }

    // close local audio / video
    p.getSenders().forEach((sender) => {
      sender.track.stop();
    });

    // close peer connection
    setTimeout(() => {
      p.close();
    }, 500);
  }
  return (
    <div className={classes.button_container}>
      <TextArea rows={3} disabled={true} value={message} disabledInputStyle={classes.text_area} placeholder="Voice command" />
      <button className={classes.speak_button} onClick={startVoice}>Speak</button>
      <button className={classes.stop_button} onClick={stopVoice}>Stop</button>
    </div>
  );
}


const useStyles = makeStyles((theme) => createStyles({
    button_container: {
        margin: 10
    },
    text_area: {
        opacity:1,
        color:'black'
    },
    speak_button : {
        width: 70,
        height: 30,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        borderColor: '#009018'
    },
    stop_button : {
        width: 70,
        height: 30,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'red',
        borderColor: '#E11803'
    },
}));