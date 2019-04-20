import React from 'react';
import { Modal, Button ,Row,Col} from 'antd';
import { Select} from 'antd';
import { message} from 'antd';
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
    let {type,scale}=this.state;
    this.setModalVisible(false);
    if((type==='EOS'&&scale>this.props.UserInfo.EOS)||(type==='ZJUBCA'&&scale>this.props.UserInfo.ZJUBCA))
    {
      message.error(`捐款失败！您账户上的${type}不足${scale}枚`);
    } 
    else{
      let date = new Date(); 
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
      let currentdate = year + '-' + month + '-' + strDate;
      message.loading(`用户${this.props.UserInfo.name}的捐款请求处理中`,1)
      .then(()=>message.success(`捐款成功!收到${type}共${scale}枚`,2))
      .then(()=>this.props.handleDonate(type,this.props.UserInfo.name,currentdate,scale));
    }
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
            span={9}
        >
            币种({this.state.type})：
        </Col>
        <Col
            span={15}
        >
          <Select defaultValue={this.state.type} style={{ width: "100%" }} onChange={this.handleChangeSelect}>
            <Option value="EOS" >EOS</Option>
            <Option value="ZJUBCA">ZJUBCA</Option>
          </Select>
        </Col>
        </Row>
        <Row>
        <Col
            span={9}
        >
            捐赠数额：
        </Col>
        <Col
            span={15}
        >
        <InputNumber 
            style={{ width: "100%" }} 
            step={0.0001}
            min={0.0000} 
            defaultValue={this.state.scale} 
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