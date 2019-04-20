import React from 'react';
import { Row, Col, Icon} from 'antd';
import {Link} from "react-router-dom";
import './TopBar.css';
export class TopBar extends React.Component {
    render() {
       return (
         <div>
         <div className="spaceTopBar spaceTopBarHeight"></div>
         <Row className="TopBar TopBarHeight" type="flex" justify="space-around" align="middle">
                  <Col 
                    style={{fontSize:'1.2em',textAlign:'center'}}
                    span={3}>
                    <Link to="/zjubca.donate/home">
                      <Icon type="home"  theme="filled" style={{color:"white"}}/>
                    </Link>                  
                  </Col>
                  <Col 
                    style={{fontSize:'1.2em',textAlign:'center'}}
                    span={3}>
                    <Link to="/zjubca.donate/about">
                      <Icon type="question-circle" style={{color:"white"}}/>
                    </Link>
                    </Col>
                  <Col 
                    style={{textAlign:'right'}}
                    span={18}>
                    <div className="username">
                      nonefishstar
                    </div>
                  
                  </Col>
         </Row>
         </div> 
         );
     }
  }
  
  export default TopBar;