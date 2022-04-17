import { myContext } from "../..";

export const storeContextHOC = (InnerComponent) => (props) =>
  (
    <myContext.Consumer>
      {(value) => <InnerComponent {...props} store={value} />}
    </myContext.Consumer>
  );
