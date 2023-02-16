import { jsx } from "@emotion/react";
import React from "react";

export function cloneElement(child, props) {
  if (child.props.css) {
    return React.cloneElement(child, {
      ...props,
      css: (theme) => [
        child.props.css instanceof Function
          ? child.props.css(theme)
          : child.props.css,
        props.css,
      ],
    });
  }
  return jsx(child.type, {
    key: child.key,
    ...child.props,
    ...props,
  });
}

export function createElement(element, props = null) {
  if (!element) {
    throw new Error(
      "Empty value passed to createElement(); expecting a component function or a React element"
    );
  }
  if (typeof element == "function") {
    const ElementType = element;
    return <ElementType {...props} />;
  }
  if (props) {
    return cloneElement(element, props);
  }
  return element;
}
