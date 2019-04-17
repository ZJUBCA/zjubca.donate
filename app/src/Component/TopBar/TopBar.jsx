import React from 'react';
import { Row, Col, Icon} from 'antd';
import './TopBar.css';
export class TopBar extends React.Component {
    render() {
       return (
         <div>
         <div className="spaceTopBar"></div>
         <Row className="TopBar" type="flex" justify="space-around" align="middle">
                  <Col 
                    style={{fontSize:'1.2em',textAlign:'center'}}
                    span={3}>
                    <Icon type="home"  theme="filled" />
                  </Col>
                  <Col 
                    style={{fontSize:'1.2em',textAlign:'center'}}
                    span={3}>
                    <Icon type="question-circle"/>
                  </Col>
                  <Col 
                    style={{textAlign:'right'}}
                    span={18}>
                  nonefishstar
                  </Col>
         </Row>
         </div>   
         );
     }
  }
  
  export default TopBar;