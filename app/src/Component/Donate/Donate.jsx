import React from 'react';
import {Row,Card,Col} from 'antd';
import DonateModal from '../DonateModal/DonateModal'
import '../StateBar/StateBar'
const DataDisplay = ({itemName,children})=>(
    <Row>
        <Col span={3}></Col>
        <Col span={6}>
            <div className="StateBarColLeft DataTitle">
                {itemName}
            </div>
        </Col>
        <Col span={6}></Col>
        <Col span={9}>
            <div className="StateBarColRight Data">
                {children}
            </div>
        </Col>
    </Row>
);
export class Donate extends React.Component {
    constructor(props){
        super();
    }
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
                    <DataDisplay itemName="ZJUBCA">{this.props.UserInfo.ZJUBCA}</DataDisplay>
                    <DataDisplay itemName="EOS">{this.props.UserInfo.EOS}</DataDisplay>
                    <DataDisplay itemName="Others">敬请期待</DataDisplay>    
                </Card>
                </Row>
                <Row>
                    <DonateModal handleDonate={this.props.handleDonate} UserInfo={this.props.UserInfo}/>
                </Row>
            </div>
        );
     }
  }
  
  export default Donate;