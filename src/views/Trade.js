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

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      'inventoryId': 0,
      'marketId': 0,
      'marketImg': 'https://i.ya-webdesign.com/images/green-question-mark-png-15.png',
      'marketTitle': '   - Click Trade next to a marketplace item',
      'dropdownText': 'Select one of your items to trade',
      'dropdownOpen': false,
      'inventory': [],
      'marketplaceInventory': [],
    }
//    this.handleChange = this.handleChange.bind(this);
    this.setMarketplace();
    this.setInventory();
  }

  // Handle the dropdown toggle
  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

//  handleChange = async (event) => {
//    const { target } = event;
//    const value = target.type === 'checkbox' ? target.checked : target.value;
//    const { name } = target;
//    console.log(name);
//    await this.setState({
//      [ name ]: value,
//    });
//  }

  trade = item => {
    console.log(item);
    this.setState({"marketId": item._id}); // set what we want to get
    this.setState({"marketImg":  item.img});
    this.setState({"marketTitle":  "   - " + item.nm + "(" + item.qty + ")"});
  };

  selectInventory = item => {
    console.log(item);
    this.setState({"inventoryId": item._id}); // set what we want to trade
    this.setState({"dropdownText": item.nm + "(" + item.qty + ")"}); // set the dropdown header to be what we selected
  };

  notify = msg => {
    var options = {};
    options = {
      place: "tc",
      message: (
          <div>{msg}</div>
      ),
      type: "info", // primary, success, danger, warning, info
      icon: "tim-icons icon-lock-circle",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  // Set the inventory drop down list for Trades
  setInventory() {
    const cookies = new Cookies();
    var username = cookies.get('username');

    console.log(`Username: ${ username }`)

    if ( username ) {
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/myInventory/incoming_webhook/myInventory', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              userFlag: true,
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
                      inventory: jsonItems,
                    });
                    console.log(jsonItems);
            } else { // error
                this.notify(json.msg);
            }
          });
    }
  }

  setMarketplace() {
    const cookies = new Cookies();
    var username = cookies.get('username');

    console.log(`Username: ${ username }`)

    if ( username ) {
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/myInventory/incoming_webhook/myInventory', {
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
                      marketplaceInventory: jsonItems,
                    });
                    console.log(jsonItems);
            } else { // error
                this.notify(json.msg);
            }
          });
    }
  }

  submitForm(e) {
    e.preventDefault();
    console.log('submitting');

    // set the cookie to persist
    const cookies = new Cookies();
    var username = cookies.get('username');

    console.log(`Username: ${ username }`)

    // check form values
    var isFormValid = true;
    if (! username ) {
        this.props.history.push('/sign-in');
    }
    if (! this.state.inventoryId ) {
        this.notify('Please select one of your inventory items to trade.');
        isFormValid = false;
    }
    if (! this.state.marketId ) {
        this.notify('Please click Trade next to a marketplace item you would like.');
        isFormValid = false;
    }

    if (isFormValid) {
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/registerTrade/incoming_webhook/registerTrade', {
            method: 'POST',
            body: JSON.stringify({
              userName: username,
              myItemId: this.state.inventoryId,
              targetItemId: this.state.marketId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json.status==="success") {
                this.props.history.push('/admin/my-trades');
            } else { // error
                console.log(json);
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
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                <CardHeader>
                    <CardTitle tag="h4">Make a Trade</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                         <label>Item</label>: <div><img alt="..." width="50px"
                             src={this.state.marketImg} /> {this.state.marketTitle}</div>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Item you would like to trade:</label>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle caret>
                                {this.state.dropdownText}
                              </DropdownToggle>
                              <DropdownMenu>
                                {this.state.inventory.map(item => (
                                  <DropdownItem key={item._id} onClick={() => this.selectInventory(item)}>{item.nm} ({item.qty})</DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                          <div className="button-container">
                              <Button className="btn-fill" color="primary" type="submit">
                                Submit
                              </Button>
                          </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                    <CardTitle tag="h4">Marketplace</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th className="text-center">Trade</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.marketplaceInventory.map(item => (
                          <tr key={item._id}>
                            <td className="text-center">{item._id}</td>
                            <td className="text-center"><div className="photo"><img alt="..." src={item.img} /></div></td>
                            <td>{item.nm}</td>
                            <td>{item.qty}</td>
                            <td>{item.desc}</td>
                            <td className="text-center">
                              <Button className="btn-fill" color="primary" type="submit" onClick={() => this.trade(item)}>
                                Trade
                              </Button>
                            </td>
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

export default Trade;