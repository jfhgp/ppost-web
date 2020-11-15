import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default class CommodityItem extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState, content) {
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onChangeValue(key, value) {
    let data = this.state.data;
    data[key] = value;
    // console.log(data);
    this.setState({ data });
    this.props.onChangeData(data, this.props.index);
  }

  render() {
    return (
      <Card
        style={{
          elevation: 1.0,
          shadowRadius: 5,
          backgroundColor: "#e1e5f4",
          margin: 4,
          paddingVertical: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Button
          label="delete"
          style={{ marginBottom: 10 }}
          onClick={() => this.props.onPressDelete(this.props.index)}
        />

        <Dropdown
          // placeholder="Request Type"
          style={{ width: "20%" }}
          value={this.state.itemType}
          options={this.props.categories}
          onChange={e => {
            console.log("val:", e.value);
            let data = this.state.data;
            data["itemType"] = e.value._id;
            // console.log(data);
            this.setState({ data, itemType: e.value });
            this.props.onChangeData(data, this.props.index);
          }}
        />
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            marginHorizontal: 5
          }}
        >
          <InputText
            style={styles.InputText}
            placeholder="Item name"
            onChange={e => this.onChangeValue("name", e.target.value)}
          />

          <InputText
            style={styles.InputText}
            placeholder="Quantity"
            onChange={e => this.onChangeValue("quantity", e.target.value)}
          />
          <InputText
            style={styles.InputText}
            placeholder="Weight (Kg)"
            onChange={e => this.onChangeValue("weight", e.target.value)}
          />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            marginHorizontal: 5
          }}
        >
          <InputText
            style={styles.InputText}
            placeholder="Length (m)"
            onChange={e => this.onChangeValue("length", e.target.value)}
          />

          <InputText
            style={styles.InputText}
            placeholder="Width (m)"
            onChange={e => this.onChangeValue("width", e.target.value)}
          />

          <InputText
            style={styles.InputText}
            placeholder="Height (m)"
            onChange={e => this.onChangeValue("height", e.target.value)}
          />
        </div>
      </Card>
    );
  }
}

const styles = {
  inputParent: {
    width: "30%",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.1,
    marginTop: 5,
    display: "flex"
  },
  InputText: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.0,
    fontSize: 16.0,
    margin: 5
  }
};
