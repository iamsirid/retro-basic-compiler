import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  // test input
  // 10 A = 1 20 IF 10 < A 60 30 PRINT A 40 A = A + 1 50 GOTO 20 60 STOP
  state = {
    input: "",
    bcodes: null,
    compiling: false
  };

  onInputChange = e => {
    e.preventDefault();

    this.setState({ input: e.target.value });
  };

  onCompileClick = e => {
    e.preventDefault();
    this.setState({ compiling: true });
    axios
      .post("/api/compile", this.state)
      .then(res => {
        // this.props.history.push("/customer/" + res.data._id);
        console.log("res.data:");
        console.log(res.data);
        this.setState({ compiling: false, bcodes: res.data.bcodes });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div>
        <header>
          <h1 className="display-4 text-center">Retro Basic Compiler</h1>
          <span className="text-center blockquote-footer">By iamsirid</span>

          <hr />
        </header>
        <div class="container">
          <div className="form-group">
            <label for="input-retro-basic">Retro Basic Code</label>
            <textarea
              onChange={e => this.onInputChange(e)}
              className="form-control mb-2"
              id="input-retro-basic"
              rows="5"
            />
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              onClick={this.onCompileClick}
            >
              Compile
            </button>
          </div>
          <hr />
          <div className="form-group">
            <label for="output-bcode">B-Code</label>
            <textarea
              className="form-control"
              id="output-bcode"
              rows="5"
              value={this.state.compiling ? "Compiling...." : this.state.bcodes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
