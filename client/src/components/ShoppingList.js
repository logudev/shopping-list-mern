import React from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
} from "reactstrap";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../redux/actions/itemActions";
import ItemModal from "./ItemModal";
import PropTypes from "prop-types";

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items, loading } = this.props.item;
    const spinnerStyle = {
      width: "4rem",
      height: "4rem",
      position: "absolute",
      margin: "0 auto",
      left: "50%",
      top: "30%",
      zIndex: "10",
    };
    return (
      <Container>
        {/* <ClipLoader size={50} color={"#123abc"} loading={loading} /> */}
        {loading && <Spinner color="info" style={spinnerStyle} />}
        <ItemModal />
        <ListGroup>
          {items &&
            items.map(({ _id, name }) => (
              <ListGroupItem key={_id}>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    debugger;
                    this.props.deleteItem(_id);
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  loading: state.loading,
});

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
