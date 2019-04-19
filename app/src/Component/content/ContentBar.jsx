import React from 'react';
import { Tabs, Icon } from 'antd';
import DonatorsList from '../DonatorsList/DonatersList';
import Donate from '../Donate/Donate';
const TabPane = Tabs.TabPane;
export class ContentBar extends React.Component {
    constructor(props){
        super();
    }
    render() {
        return (
            <Tabs defaultActiveKey="1">
            <TabPane 
                tab={
                <span>
                    <Icon type="profile" />
                    捐赠记录
                </span>
                } 
            key="1">
            <DonatorsList donators={this.props.donators}/>
            </TabPane>
            <TabPane 
                tab={
                <span>
                    <Icon type="money-collect" />
                    我要捐赠
                </span>
                } 
            key="2">
            <Donate handleDonate={this.props.handleDonate} UserInfo={this.props.UserInfo}/>
            </TabPane>
        </Tabs>
        );
     }
  }
  
  export default ContentBar;