import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      intervalIsSet: false,
      addItem: null,
      UpdateItem: null
    };
  }

  componentDidMount() {
    if (!this.state.intervalIsSet) {
      axios
        .get(`/crud`)
        .then(response => {
          console.log(response.data);
          this.setState({ items: [...response.data] });
          this.setState({ intervalIsSet: false });
        })
        .catch(error => this.setState({ message: "not render" }));
    }
  }

  //for memory leaks
  /*componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: false });
      console.log("component removed");
    }
  }*/

  //DELETE
  deleteItem = _id => {
    this.setState(() => ({
      items: this.state.items.filter(item => item._id !== _id)
    }));
    axios
      .delete(`http://localhost:2000/crud/${_id}`)
      .then(toast.info("Item deleted"))
      .catch(err => toast.error(err));
  };

  //CREATE
  addItem = item => {
    if (!this.state.addItem) {
      return toast.warn("Please submit an item");
    }
    axios
      .post(`http://localhost:2000/crud/${item}`)
      .then(res => {
        this.setState({ items: [...this.state.items, ...res.data] });
        toast.info("Item Added to cart");
      })
      .catch(err => toast.error(err));
  };

  //UPDATE
  UpdateItem = item => {
    if (!this.state.UpdateItem) {
      return toast.warn("Please submit change");
    }
    axios
      .post(`http://localhost:2000/crud/${item}/${this.state.UpdateItem}`)
      .then(res => {
        console.log(res.data);
        this.setState({ items: [...res.data] });
        toast.info("Item Updated");
      })
      .catch(err => toast.error(err));
  };

  //READ
  render() {
    const { items } = this.state;
    return (
      <div className="container">
        <ToastContainer />
        <div className="badge badge-pill badge-success mt-4 mb-3">
          {items.length} items
        </div>
        <div className="card border-info" style={{ maxWidth: "30%" }}>
          <div className="card-header">Add an Item or update it</div>
          <div className="card-body">
            <input
              type="text"
              placeholder="Add an item"
              id="Add"
              onChange={e => this.setState({ addItem: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-info mb-2"
              onClick={() => this.addItem(this.state.addItem)}
            >
              Add
            </button>
            <input
              type="text"
              placeholder="Update an item"
              id="Update"
              onChange={e => this.setState({ UpdateItem: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3">
          {items.length <= 0 ? (
            <h1>The cart is empty</h1>
          ) : (
            items.map(({ _id, name }) => (
              <div key={_id} className="col-lg-2 mb-2">
                <div className="card border-primary">
                  <div className="card-header">{name}</div>
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn badge-pill btn-danger mb-2"
                      onClick={() => this.deleteItem(_id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn badge-pill btn-info"
                      onClick={() => this.UpdateItem(_id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ShoppingList;
