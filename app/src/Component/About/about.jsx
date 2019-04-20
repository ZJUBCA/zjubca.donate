import React from 'react';
import { } from 'antd';
import logo from '../../asset/logo_general.png';
import './about.css';
export class About extends React.Component {
    render() {
        return (
            <div className="AboutDiv">
                
                <h2>浙江大学区块链协会捐赠系统</h2>
                <img src={logo} alt="" className="AboutLogo"/>
                <p>所有捐赠将进入协会捐赠账户，定量转移到协会账户</p>
                <p>~感谢您的捐赠~</p>
            </div>
        );
     }
  }
  
  export default About;