import { Box } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useCallback, useState } from "react";
import { MasonryProps } from "./Masonry";

const DEFAULT_COLUMNS = 1;
const useMasonry = ({ breakpointsCols, children, ...props }: MasonryProps) => {
  const [columnCount, setColumnCount] = useState(() => {
    return breakpointsCols === undefined
      ? DEFAULT_COLUMNS
      : typeof breakpointsCols === "number"
      ? breakpointsCols
      : breakpointsCols.default;
  });

  const reCalculateColumnCount = useCallback(() => {
    const windowWidth = (window && window.innerWidth) || Infinity;
    let breakpointColsObject = breakpointsCols;
    // Allow passing a single number to `breakpointCols` instead of an object
    if (
      typeof breakpointColsObject !== "undefined" &&
      typeof breakpointColsObject !== "object"
    ) {
      breakpointColsObject = {
        default: breakpointColsObject || DEFAULT_COLUMNS,
      };
    }
    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject?.default || DEFAULT_COLUMNS;
    for (const breakpoint in breakpointColsObject) {
      const optBreakpoint =
        breakpoint === "default"
          ? breakpointColsObject.default
          : parseInt(breakpoint);
      const isCurrentBreakpoint =
        optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[optBreakpoint];
      }
    }

    columns = Math.max(1, columns || 1);

    if (columnCount !== columns) {
      setColumnCount(columns);
    }
  }, [breakpointsCols, columnCount]);

  const reCalculateColumnCountDebounce = useCallback(
    // eslint-disable-next-line
    function (this: any) {
      if (!window || !window.requestAnimationFrame) {
        // IE10+
        reCalculateColumnCount();
        return;
      }

      if (window.cancelAnimationFrame) {
        // IE10+
        window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
      }

      this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
        reCalculateColumnCount();
      });
    },
    [reCalculateColumnCount]
  );

  const itemsInColumns = () => {
    const currentColumnCount = columnCount;
    // Force children to be handled as an array
    const items = React.Children.toArray(children);

    const itemsInColumns: Array<typeof items> = new Array(currentColumnCount);

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if (!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  };

  const renderColumns = () => {
    const { columnAttrs = {}, fixedColumnWidth } = props;
    const childrenInColumns = itemsInColumns();
    const columnWidth =
      childrenInColumns.length === 1
        ? "100%"
        : fixedColumnWidth ?? `${100 / childrenInColumns.length}%`;

    const columnAttributes = {
      ...columnAttrs,
      style: {
        ...columnAttrs.style,
        width: columnWidth,
      },
    };

    return childrenInColumns.map((items, i) => {
      return (
        <Box
          sx={{
            backgroundClip: "padding-box",
            "& > div": {
              marginBottom: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
          {...columnAttributes}
          key={i}
        >
          {items}
        </Box>
      );
    });
  };

  useLayoutEffect(() => {
    reCalculateColumnCount();
    // window may not be available in some environments like SSR
    if (window) {
      window.addEventListener("resize", reCalculateColumnCountDebounce);
    }
    return () => {
      window.removeEventListener("resize", reCalculateColumnCountDebounce);
    };
  }, [reCalculateColumnCount, reCalculateColumnCountDebounce]);

  return { renderColumns };
};
export default useMasonry;
