import React from 'react';
import { List ,Row,Col} from 'antd';


export class DonatorsList extends React.Component {
    constructor(props){
        super();
    }
    render() {
        return (
            <List
                itemLayout="vertical"
                dataSource={this.props.donators}
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