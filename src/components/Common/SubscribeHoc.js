import React from "react";

export function subscribeHOC(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  };
}
