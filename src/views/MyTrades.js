import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

class MyTrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'trades': [],
    }
    this.setTrades();
  }

  notify = msg => {
    // dummy alert in case of error
    var options = {};
    options = {
      place: "tc",
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: "info", // primary, success, danger, warning, info
      icon: "tim-icons icon-lock-circle",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  setTrades() {
    const cookies = new Cookies();
    var username = cookies.get('username');

    console.log(`Username: ${ username }`)

    if ( username ) {
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/myTrades/incoming_webhook/myTrades', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json.status==="success") {
                var jsonItems = JSON.parse(json.items);
                this.setState({
                      trades: jsonItems,
                    });
                    console.log(jsonItems);
            } else { // error
                this.notify(json.msg);
            }
          });
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                    <CardTitle tag="h4">My Trades</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">Date</th>
                        <th className="text-center">Trading For</th>
                        <th className="text-center">Offering</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.trades.map(item => (
                          <tr key={item._id}>
                            <td className="text-center">{item.date}</td>
                            <td className="text-center"><div className="photo"><img alt="..." src={item.tradeImg} /></div> {item.tradeNm} ({item.tradeQty})</td>
                            <td className="text-center"><div className="photo"><img alt="..." src={item.img} /></div> {item.nm} ({item.qty})</td>
                            <td className="text-center">{item.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MyTrades;