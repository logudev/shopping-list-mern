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
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../redux/actions/itemActions";

const ItemModal = ({ addItem }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const toggle = () => setModalOpen(!isModalOpen);

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
    };
    addItem(newItem);
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="itemName"
                id="item"
                placeholder="Add Item"
                onChange={(e) => setItemName(e.target.value)}
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
};

export default connect(undefined, { addItem })(ItemModal);
