import React from 'react';
import {Card,Col,Row,Divider} from 'antd';
import './StateBar.css';
import ContentBar from '../content/ContentBar';

const DataDisplay = ({itemName,children})=>(
    <Row>
        <Col span={3}></Col>
        <Col span={6}>
            <div className="StateBarCol">
                {itemName}
            </div>
        </Col>
        <Col span={6}></Col>
        <Col span={9}>
            <div className="StateBarCol">
                {children}
            </div>
        </Col>
    </Row>
);
export class StateBar extends React.Component {
    render() {
       return (
        <Card 
            bordered={false}
            title="协会捐赠协议"
            extra={false}
            style={{ width: '96%',margin:'2%',textAlign:'center'}}
        >
            <Row>
                <Col
                    span={3}
                >
                    捐赠账户
                </Col>
                <Col
                    span={21}
                >
                    <DataDisplay itemName="ZJUBCA">120.0000</DataDisplay>
                    <DataDisplay itemName="EOS">250.1234</DataDisplay>
                    <DataDisplay itemName="others">building...</DataDisplay>    
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col
                    span={3}
                >
                    协会账户
                </Col>
                <Col
                    span={21}
                >
                    <DataDisplay itemName="ZJUBCA">120.0000</DataDisplay>
                    <DataDisplay itemName="EOS">250.1234</DataDisplay>
                    <DataDisplay itemName="others">building...</DataDisplay>    
                </Col>
            </Row>
            <Divider/>
            <ContentBar/>
        </Card>
        );
     }
  }
  
  export default StateBar;