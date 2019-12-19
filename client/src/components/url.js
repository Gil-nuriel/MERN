import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class url extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: null,
      shortUrl: null
    };
  }

  generateNewUrl = url => {
    if (!this.state.longUrl) {
      return toast.warn("Please enter URL");
    }
    axios
      .post(`http://localhost:2000/shorter`, { url: url })
      .then(response => {
        console.log(response.data);
        this.setState({ shortUrl: response.data.shortUrl });
        toast.success("New short URL generated");
      })
      .catch(error => {
        console.log(error);
        toast.error("URL is not valid");
      });
  };

  render() {
    return (
      <div className="container mt-5">
        <ToastContainer />
        <div className="card border-primary mb-3" style={{ width: "50%" }}>
          <div className="card-header">Generate a short URL</div>
          <div className="card-body">
            <div className="form-group">
              <label
                className="col-form-label col-form-label-sm"
                htmlFor="inputSmall"
              >
                copy a url and paste it here:
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="longUrl"
                id="inputSmall"
                onChange={e => this.setState({ longUrl: e.target.value })}
              />

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => this.generateNewUrl(this.state.longUrl)}
              >
                Generate
              </button>
            </div>
            <p>{this.state.shortUrl}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default url;
