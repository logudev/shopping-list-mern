import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";
import PropTypes from "prop-types";

class RegisterModal extends React.Component {
  state = { isModalOpen: false, name: "", email: "", password: "", msg: null };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {
    // Clear errors before opening or closing the modal
    this.props.clearErrors();
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      name: "",
      email: "",
      password: "",
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    // Attempt to register
    this.props.registerUser({ name, email, password });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg,
        });
      } else {
        this.setState({ msg: null });
      }
    }
    if (this.state.isModalOpen && isAuthenticated) {
      this.setState({
        name: "",
        email: "",
        password: "",
      });
      this.toggle();
    }
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  className="mb-3"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  type="submit"
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegisterModal
);
