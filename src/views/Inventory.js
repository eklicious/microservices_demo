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
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'nm': '',
      'qty': 0,
      'desc': '',
      'img': '',
      'inventory': []
    }
    this.handleChange = this.handleChange.bind(this);
    this.setInventory();
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
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

  submitForm(e) {
    e.preventDefault();

    // set the cookie to persist
    const cookies = new Cookies();
    var username = cookies.get('username');

    console.log(`Username: ${ username }`)
    console.log(`Item Name: ${ this.state.nm }`)
    console.log(`Qty: ${ this.state.qty }`)
    console.log(`Desc: ${ this.state.desc }`)
    console.log(`Image: ${ this.state.img }`)

    // check form values
    var isFormValid = true;
    if (! username ) {
        this.props.history.push('/sign-in');
    }
    if (! this.state.nm ) {
        this.notify('Item name is required.');
        isFormValid = false;
    }
    if (! this.state.qty ) {
        this.notify('Quantity is required.');
        isFormValid = false;
    }
    if (! this.state.desc ) {
        this.notify('Description is required.');
        isFormValid = false;
    }
    if (! this.state.img ) {
        this.notify('Image url is required.');
        isFormValid = false;
    }

    if (isFormValid) {
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/addInventory/incoming_webhook/addInventory', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              nm: this.state.nm,
              qty: this.state.qty,
              desc: this.state.desc,
              img: this.state.img,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json.status==="success") {
                console.log("setting state nm to empty...");
                this.setState({
                      nm: '',
                      qty: 0,
                      img: '',
                      desc: '',
                    });
               // refresh the list of inventory
               this.setInventory();
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
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                <CardHeader>
                    <CardTitle tag="h4">Add New Inventory</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Item Name</label>
                          <Input
                            value={this.state.nm}
                            placeholder="Item Name"
                            name="nm"
                            type="text"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Quantity</label>
                          <Input
                            value={this.state.qty}
                            placeholder="Quantity"
                            name="qty"
                            type="number"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Image URL</label>
                          <Input
                            value={this.state.img}
                            placeholder="Image URL"
                            name="img"
                            type="text"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            value={this.state.desc}
                            placeholder="Description"
                            name="desc"
                            type="text"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
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
                    <CardTitle tag="h4">My Inventory</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Image</th>
                        <th>Name</th>
                        <th className="text-center">Quantity</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.inventory.map(item => (
                          <tr key={item._id}>
                            <td className="text-center">{item._id}</td>
                            <td className="text-center"><div className="photo"><img alt="..." src={item.img} /></div></td>
                            <td>{item.nm}</td>
                            <td className="text-center">{item.qty}</td>
                            <td>{item.desc}</td>
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

export default Inventory;
