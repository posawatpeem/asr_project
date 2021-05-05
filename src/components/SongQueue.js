import React from 'react';
import { Row, Col } from 'antd';

export default function SongQueue({ track, chooseTrack }){
    function handlePlay() {
        chooseTrack(track);
    }
    
    return(
    <Row
      style={{ cursor: "pointer", marginTop:"10px" }}
      onClick={handlePlay}
    >
      <Col span={6}>
          <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      </Col>
      <Col>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </Col>
    </Row>
    )
}