import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./index.css";

export default class BvModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.props.visible && (
            <div
              className="wrap-box"
              role="presentation"
              onClick={(e) => {
                e.stopPropagation();
                if (e.target.className === "wrap-box") {
                  this.props.onCancel(e);
                }
              }}
              ref={(ref) => (this.wrapBox = ref)}
            >
              <div
                className="innerStyle"
                {...this.props}
                title={undefined}
                visible={undefined}
                hasfooter={undefined}
                create_criteria={undefined}
                role="presentation"
              >
                <div className="titleStyle">
                  {this.props.title || "Sample Title"}
                </div>
                <div className="outterStyle">
                  {/* header */}
                  {this.props.header && (
                    <div className="headerStyle">{this.props.header}</div>
                  )}
                  {/* body */}
                  <div className="bodyStyle">{this.props.children}</div>
                  {this.props.hasfooter && (
                    <div className="footerStyle">
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <BvButton
                          style={{ marginRight: 20, marginTop: 2 }}
                          icon={<Icon type="check" />}
                          onClick={this.props.onOk}
                        >
                          Ok
                        </BvButton>
                        <BvButton
                          style={{ marginRight: 10, marginTop: 2 }}
                          icon={<Icon type="close" />}
                          onClick={this.props.onCancel}
                        >
                          Cancel
                        </BvButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

BvModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  title: PropTypes.string,
  header: PropTypes.any,
  hasfooter: PropTypes.bool,
};

BvModal.defaultProps = {
  hasfooter: true,
  title: "Filter Editor",
  header: null,
};

const BvButton = (props) => {
  const style = {
    width: 80,
    height: 20,
    lineHeight: 0,
  };
  return (
    <button {...props} style={{ ...style, ...props.style }}>
      {props.icon}
      {props.children}
    </button>
  );
};
