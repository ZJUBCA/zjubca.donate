import React from 'react';
import {Card,Col,Row,Divider} from 'antd';
import './StateBar.css';
import ContentBar from '../content/ContentBar';

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
export class StateBar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account:{
                DonateAccount:{
                    EOS:120.0000,
                    ZJUBCA:1000.0000
                },
                AssociationAccount:{
                    EOS:20.0000,
                    ZJUBCA:20000.0000
                },
                UserAccount:{
                    name:'nonefishstar',
                    EOS:20.0000,
                    ZJUBCA:20000.0000
                }
            },
            donators:
                [{
                    name: 'nonefishstar',
                    date:'2019-2-17',
                    type:'EOS',
                    scale:20.000
                  }
                ]
        }
    }
    handleDonate=(type,name,date,scale)=>{
        let donators=this.state.donators;
        let account=this.state.account;
        donators.push({
            name:name,
            date:date,
            type:type,
            scale:scale
        });
        if(type==='EOS'){
            account.DonateAccount.EOS+=scale;
            account.UserAccount.EOS-=scale;
        }
        else if(type==='ZJUBCA'){
            account.DonateAccount.ZJUBCA+=scale;
            account.UserAccount.ZJUBCA-=scale;
        }
        this.setState({
            donators:donators,
            account:account
        });
    }
    render() {
       return (
        <Card 
            bordered={false}
            
            extra={false}
            style={{ width: '96%',margin:'2%',textAlign:'center'}}
        >
            <Card 
                bordered={true}
                title={<h2 className="BoldTitle">协会账户公示</h2>}
                extra={false}
                style={{ width: '96%',margin:'2%',textAlign:'center'}}
            >
            <Row
                type="flex" justify="space-around" align="middle"
            >
                <Col
                    span={3}
                >
                    捐赠账户
                </Col>
                <Col
                    span={21}
                >
                    <DataDisplay itemName="ZJUBCA">{this.state.account.DonateAccount.ZJUBCA.toFixed(4)}</DataDisplay>
                    <DataDisplay itemName="EOS">{this.state.account.DonateAccount.EOS.toFixed(4)}</DataDisplay>
                    <DataDisplay itemName="Others">敬请期待</DataDisplay>    
                </Col>
            </Row>
            <Divider/>
            <Row
                type="flex" justify="space-around" align="middle"
            >
                <Col
                    span={3}
                >
                    协会账户
                </Col>
                <Col
                    span={21}
                >
                    <DataDisplay itemName="ZJUBCA">{this.state.account.AssociationAccount.EOS.toFixed(4)}</DataDisplay>
                    <DataDisplay itemName="EOS">{this.state.account.AssociationAccount.ZJUBCA.toFixed(4)}</DataDisplay>
                    <DataDisplay itemName="Others">敬请期待</DataDisplay>    
                </Col>
            </Row>
            </Card>
            <Divider/>
            <ContentBar donators={this.state.donators} handleDonate={this.handleDonate} UserInfo={this.state.account.UserAccount}/>
        </Card>
        );
     }
  }
  
  export default StateBar;