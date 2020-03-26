import React from "react";

import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'first': '',
      'last': '',
      'email': '',
      'username': '',
      'password': '',
      'confirmpassword': '',
      'photo': '',
    }
    this.handleChange = this.handleChange.bind(this);
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

  submitForm(e) {
    e.preventDefault();
    console.log(`First: ${ this.state.first }`)
    console.log(`Last: ${ this.state.last }`)
    console.log(`Email: ${ this.state.email }`)
    console.log(`Username: ${ this.state.username }`)
    console.log(`Password: ${ this.state.password }`)
    console.log(`Confirm Password: ${ this.state.confirmpassword }`)
    console.log(`Photo: ${ this.state.photo }`)

    // check form values
    var isFormValid = true;
    if (! this.state.first ) {
        this.notify('First name is required.');
        isFormValid = false;
    }
    if (! this.state.last ) {
        this.notify('Last name is required.');
        isFormValid = false;
    }
    if (! this.state.email ) {
        this.notify('Email is required.');
        isFormValid = false;
    }
    if (! this.state.username ) {
        this.notify('Username is required.');
        isFormValid = false;
    }
    if (! this.state.password || ! this.state.confirmpassword) {
        this.notify('Password is required.');
        isFormValid = false;
    }
    if (this.state.password!==this.state.confirmpassword) {
        this.notify('Passwords need to match.');
        isFormValid = false;
    }
    if (! this.state.photo ) {
        this.notify('Profile image url is required.');
        isFormValid = false;
    }

    if (isFormValid) {
        // Dummy GET rest api call
    //    fetch('http://jsonplaceholder.typicode.com/users')
    //        .then(res => res.json())
    //        .then((data) => {
    //          this.setState({ contacts: data })
    //            console.log(this.state.contacts[0])
    //       })
    //        .catch(console.log)

        // Dummy POST rest api call
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/signup/incoming_webhook/signup', {
            method: 'POST',
            body: JSON.stringify({
              first: this.state.first,
              last: this.state.last,
              email: this.state.email,
              username: this.state.username,
              password: this.state.password,
              photo: this.state.photo,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json.status==="success") {
                this.props.history.push('/sign-in');
            } else { // error
                this.notify(json.msg);
            }
          });
    }
  }

  render() {
    return (
      <>
        <div className="content" style={{ backgroundImage: `url(${require("assets/img/corona_wallpaper.png")})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
         }}>
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="8">
              <Card>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                <CardHeader>
                  <h5 className="title">Register a New Account</h5>
                </CardHeader>
                <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue=""
                            placeholder="First Name"
                            name="first"
                            type="text"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue=""
                            placeholder="Last Name"
                            name="last"
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
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="email@company.com" type="email"
                            name="email"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue=""
                            placeholder="Username"
                            name="username"
                            type="text"
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
                          <label>Password</label>
                          <Input
                            defaultValue=""
                            placeholder=""
                            type="password"
                            name="password"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                            defaultValue=""
                            placeholder=""
                            type="password"
                            name="confirmpassword"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Profile Image URL</label>
                          <Input
                            defaultValue=""
                            placeholder="Profile Image URL"
                            name="photo"
                            type="text"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                <CardFooter>
                  <div className="button-container">
                      <Button className="btn-fill" color="primary" type="submit">
                        Submit
                      </Button>
                  </div>
                  <div className="button-container">
                      <a href="/public/sign-in">Already have an account? Login</a>
                  </div>
                </CardFooter>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default SignUp;
