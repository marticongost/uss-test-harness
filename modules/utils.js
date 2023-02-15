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
