import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'username': '',
      'password': ''
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
    console.log(`Username: ${ this.state.username }`)
    console.log(`Password: ${ this.state.password }`)

    var isFormValid = true;
    if (! this.state.username ) {
        this.notify('Username is required.');
        isFormValid = false;
    }
    if (! this.state.password) {
        this.notify('Password is required.');
        isFormValid = false;
    }

    if (isFormValid) {
        // Dummy POST rest api call
        fetch('https://us-east-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/audit-idrdg/service/signin/incoming_webhook/signin', {
            method: 'POST',
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => {
            if (json.status==="success") {
                console.log(json.result);
                // set the cookie to persist
                const cookies = new Cookies();
                cookies.set('username', this.state.username, { path: '/' });
                cookies.set('email', json.result.email, { path: '/' });
                cookies.set('name', json.result.first + ' ' + json.result.last, { path: '/' });
                cookies.set('photo', json.result.photo, { path: '/' });
                console.log(cookies.get('photo'));
                this.props.history.push('/admin/notifications');
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
          <Row md="10">
            <Col md="8">
              <Card className="card-user">
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/corona_headshot.png")}
                      />
                      <h3 className="title">User Sign In</h3>
                    </a>
                  </div>
                  <div className="card-description">
                    <Row>
                      <Col className="pr-md-1" md="10">
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
                      <Col className="pr-md-1" md="10">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            defaultValue=""
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={ (e) => {
                                this.handleChange(e)
                            } }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                      <Button className="btn-fill" color="primary" type="submit">
                        Submit
                      </Button>
                  </div>
                  <div className="button-container">
                      <a href="/public/sign-up">Create a New Account</a>
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

export default SignIn;
