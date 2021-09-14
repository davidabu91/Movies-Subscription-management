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
import { addItem } from "../../actions/usersactions";

function ItemModal(props) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: `${name.length}${name}`,
      FirstName: name,
      LastNAme: "Abou",
      DateCreated: "03/04/2021",
      SessionTimeOut: 500,
    };

    //Add item via addItem action
    props.addItem(newItem);

    //Close modal
    toggle();
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>
      <Modal  isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add To List </ModalHeader>{" "}
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item"> Item </Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add Item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
