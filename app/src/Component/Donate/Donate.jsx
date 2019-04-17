import React from 'react';
import {Row,Card,Col} from 'antd';
import DonateModal from '../DonateModal/DonateModal'
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
export class Donate extends React.Component {
    render() {
        return (
            <div>
                <Row>
                <Card
                    bordered={false}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="您的现有资产"
                    extra={false}
                    >
                    <DataDisplay itemName="ZJUBCA">120.0000</DataDisplay>
                    <DataDisplay itemName="EOS">250.1234</DataDisplay>
                    <DataDisplay itemName="others">building...</DataDisplay>    
                </Card>
                </Row>
                <Row>
                    <DonateModal/>
                </Row>
                <Row>
                    感谢前辈这些年在协会中的付出，欢迎您常回家看看~
                </Row>
            </div>
        );
     }
  }
  
  export default Donate;