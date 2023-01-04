import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResult: "0",
      isDarkMode: false,
    };
  }

  calcNumbers(val) {
    if (!("x/+%".indexOf(val) > -1 && this.state.displayResult === "0")) {
      if (val === "C") {
        this.setState({ displayResult: "0" });
      } else if (val === "<") {
        if (this.state.displayResult !== "0") {
          if (this.state.displayResult.length === 1) {
            this.setState({
              displayResult:
                this.state.displayResult.slice(
                  0,
                  this.state.displayResult.length - 1
                ) + "0",
            });
          } else {
            this.setState({
              displayResult: this.state.displayResult.slice(
                0,
                this.state.displayResult.length - 1
              ),
            });
          }
        }
      } else {
        if (
          ("x/+%-".indexOf(val) > -1 &&
            "x/+%-".indexOf(this.state.displayResult.slice(-1)) > -1) ||
          (this.state.displayResult === "0" && val !== ".") ||
          (this.state.displayResult.slice(-1) === "." && val === ".")
        ) {
          if (
            val === "-" &&
            "x/".indexOf(this.state.displayResult.slice(-1)) > -1
          ) {
            this.setState({ displayResult: this.state.displayResult + val });
          } else {
            if (
              "x/+%-".indexOf(
                this.state.displayResult.charAt(
                  this.state.displayResult.length - 2
                )
              ) > -1
            ) {
              this.setState({
                displayResult:
                  this.state.displayResult.slice(
                    0,
                    this.state.displayResult.length - 2
                  ) + val,
              });
            } else {
              this.setState({
                displayResult:
                  this.state.displayResult.slice(
                    0,
                    this.state.displayResult.length - 1
                  ) + val,
              });
            }
          }
        } else if (
          "x/+-%".indexOf(this.state.displayResult.slice(-1)) > -1 &&
          val === "."
        ) {
          this.setState({ displayResult: this.state.displayResult + "0." });
        } else {
          let last = this.state.displayResult.split(/x|\/|\+|-|%/);
          if (!(last[last.length - 1].indexOf(".") > -1 && val === ".")) {
            this.setState({ displayResult: this.state.displayResult + val });
          }
        }
      }
    }
  }

  evalResult() {
    let result;
    // eslint-disable-next-line
    result = eval(this.state.displayResult.replace(/x/g, "*"));
    if (result % 1 !== 0) {
      result = parseFloat(result.toFixed(4));
    }
    this.setState({ displayResult: result.toString() });
  }

  changeTheme() {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  }

  render() {
    return (
      <div className={this.state.isDarkMode ? "theme-black" : ""}>
        <div className="container">
          <form>
            <div className="display">
              <div className="theme" onClick={() => this.changeTheme()}>
                <i className="fas fa-moon"></i>
              </div>
              <input
                type="text"
                id="display"
                readOnly
                placeholder="0"
                value={this.state.displayResult}
              />
            </div>
            <div className="buttons">
              <div className="row">
                <input
                  type="button"
                  id="clear"
                  className="text-primary"
                  value="C"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="divide"
                  className="text-primary"
                  value="/"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="multiply"
                  className="text-primary"
                  value="x"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  className="text-primary backspace"
                  value="<"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
              </div>
              <div className="row">
                <input
                  type="button"
                  id="seven"
                  value="7"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="eight"
                  value="8"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="nine"
                  value="9"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="subtract"
                  className="text-primary"
                  value="-"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
              </div>

              <div className="row">
                <input
                  type="button"
                  id="four"
                  value="4"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="five"
                  value="5"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="six"
                  value="6"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="add"
                  className="text-primary"
                  value="+"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
              </div>

              <div className="row">
                <input
                  type="button"
                  id="one"
                  value="1"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="two"
                  value="2"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="three"
                  value="3"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  className="equal"
                  id="equals"
                  value="="
                  onClick={() => this.evalResult()}
                />
              </div>

              <div className="row">
                <input
                  type="button"
                  id="decimal"
                  value="."
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  id="zero"
                  value="0"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
                <input
                  type="button"
                  value="%"
                  onClick={(e) => this.calcNumbers(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Calculator;
