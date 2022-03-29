import React from "react";
import { IonIcon, addIcons } from "react-svg-ionicons";
import bundle from "react-svg-ionicons/bundles/all";

import PropTypes from "prop-types";
import { Colors } from "../../utility";

addIcons(bundle);

const ActivityList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        style={{ borderWidth: "0 0 2px" }}
      >
        <span className="col-1 font-weight-bold">类型</span>
        <span className="col-5 font-weight-bold">类容</span>
        <span className="col-2 font-weight-bold">价格</span>
        <span className="col-2 font-weight-bold">时间</span>
        <span className="col-1 font-weight-bold">修改</span>
        <span className="col-1 font-weight-bold">删除</span>
      </li>
      {items.map((item) => (
        <li
          className="list-group-item d-flex 
            justify-content-between align-items-center"
          key={item.id}
        >
          <span className="col-1">
            <IonIcon
              className="rounded-circle"
              fontSize="30px"
              style={{ backgroundColor: Colors.blue, padding: "5px" }}
              color={"#fff"}
              name={item.category.iconName}
            />
          </span>
          <span className="col-5">{item.title}</span>
          <span className="col-2 font-weight-bold">
            {item.category.type === "income" ? "+" : "-"}
            {item.amount}元
          </span>
          <span className="col-2">{item.date}</span>
          <a
            className="col-1"
            role="button"
            onClick={(event) => {
              onModifyItem(item);
            }}
          >
            <IonIcon
              className="rounded-circle"
              fontSize="30px"
              style={{ backgroundColor: Colors.green, padding: "5px" }}
              color={"#fff"}
              name="create"
            />
          </a>
          <a
            className="col-1"
            role="button"
            onClick={(event) => {
              onDeleteItem(item);
            }}
          >
            <IonIcon
              className="rounded-circle"
              fontSize="30px"
              style={{ backgroundColor: Colors.red, padding: "5px" }}
              color={"#fff"}
              name="close"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

ActivityList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ActivityList;
