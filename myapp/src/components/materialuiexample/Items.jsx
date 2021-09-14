import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../../actions/usersactions";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

function Items(props) {

  const items = props.item.items;

  useEffect( () => {
    props.getItems();
  },[]);

  const onDeleteClick = (id) => {
    props.deleteItem(id);
  };

  // const onDeleteClick = (id) => {
  //   props.dispatch({
  //     type: 'DELETE_ITEM',
  //     payload: id
  //   })
  // }

  return (
    <div>
      {items.map(({ id, FirstName }) => {
        return (
          <div>
            <h4 key={id}> {FirstName} </h4>
            <Button onClick={onDeleteClick.bind(this, id)}> Delete </Button>
          </div>
        );
      })}
    </div>
  );
}

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(Items);
