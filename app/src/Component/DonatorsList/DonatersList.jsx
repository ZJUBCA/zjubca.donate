import React from 'react';
import { List ,Row,Col} from 'antd';

const data = [
  {
    name: 'nonefishstar',
    date:'2019-2-17',
    type:'EOS',
    scale:20.000
  },
  {
    name: 'userrobotsss',
    date:'2019-2-17',
    type:'ZJUBCA',
    scale:2000.000
  },
  {
    name: 'userrobotsss',
    date:'2019-2-17',
    type:'EOS',
    scale:200.000  
  },
  {
    name: 'userrobotsss',
    date:'2019-2-17',
    type:'EOS',
    scale:2000.000
  },
];
export class DonatorsList extends React.Component {
    render() {
        return (
            <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <Row>
                        <Col
                            span={12}
                            style={{ textAlign:'left',fontWeight:'bold'}}       
                        >
                            {item.name}
                        </Col>
                        <Col
                            span={12}
                            style={{ textAlign:'right'}}
                        >
                            {item.scale.toFixed(4)}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={12}
                            style={{ textAlign:'left'}}
                        >
                            {item.type}
                        </Col>
                        <Col
                            span={12}
                            style={{ textAlign:'right'}}
                        >
                            {item.date}
                        </Col>
                    </Row>
                </List.Item>
                )}
            />
        );
     }
  }
  
  export default DonatorsList;