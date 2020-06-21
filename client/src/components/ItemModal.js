import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../redux/actions/itemActions";
import { clearErrors } from "../redux/actions/errorActions";

class ItemModal extends React.Component {
  state = {
    isModalOpen: false,
    itemName: "",
    errorMsg: null,
  };

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      itemName: "",
      isModalOpen: !this.state.isModalOpen,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.itemName,
    };
    this.props.addItem(newItem).then(() => {
      this.toggle();
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error.id === "ITEM_ADD_FAIL") {
        this.setState({
          errorMsg: this.props.error.msg,
        });
      } else {
        this.setState({ errorMsg: null });
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3">Please login to manage items</h4>
        )}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            {this.state.errorMsg ? (
              <Alert color="danger">{this.state.errorMsg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="itemName"
                  id="item"
                  placeholder="Add Item"
                  onChange={this.onChange}
                  value={this.state.itemName}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  type="submit"
                >
                  Add Item
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
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem, clearErrors })(ItemModal);
