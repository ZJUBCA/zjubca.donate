import React from 'react';
import { Modal, Button ,Row,Col} from 'antd';
import { Select} from 'antd';
import { InputNumber } from 'antd';
const Option = Select.Option;
export class DonateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            type:'EOS',
            scale:0.000
        };
    }
  

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  handleChangeSelect=(e)=>{
    this.setState({type:this.state.type==='EOS'?'ZJUBCA':'EOS'});
  }
  handleScaleChange=(scale)=>{
    this.setState({scale:scale});
  }
  handleOK=()=>{
    this.setModalVisible(false);
    console.log("收到捐款");
    console.log(`币种：${this.state.type}，一共${this.state.scale}枚`);
  }
  handleCancel=()=>{
    this.setModalVisible(false);
    console.log("取消捐款");
  }
  render() {
    return (
      <div>
        <br />
        <Button type="primary" onClick={() => this.setModalVisible(true)}>发起捐赠</Button>
        <Modal
          closable={false}
          okText={"确定"}
          cancelText={"再想想"}
          title="请填写您的捐赠信息"
          centered
          visible={this.state.modalVisible}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
        >
        <Row>
        <Col
            span={6}
        >
            币种({this.state.type})：
        </Col>
        <Col
            span={18}
        >
          <Select defaultValue={this.state.type} style={{ width: "100%" }} onChange={this.handleChangeSelect}>
            <Option value="EOS" >EOS</Option>
            <Option value="ZJUBCA">ZJUBCA</Option>
          </Select>
        </Col>
        </Row>
        <Row>
        <Col
            span={6}
        >
            捐赠数额：
        </Col>
        <Col
            span={18}
        >
        <InputNumber 
            style={{ width: "100%" }} 
            step={0.0001}
            min={0.0000} 
            max={100.0000} 
            defaultValue={0.0000} 
            onChange={this.handleScaleChange} 
        />
        </Col>
        </Row>
        
        </Modal>
      </div>
    );
  }
}

export default DonateModal;