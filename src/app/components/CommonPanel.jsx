import React, { Component } from 'react';

export default class CommonPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        {...this.props}
        style={{
          border: '1px solid',
          borderColor: '#ffadd2',
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
CommonPanel.defaultProps = {
  width: 200,
  height: 200,
};
