import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';

/**
 * Component displaying a print-like page with the properties `format` which expects a
 * reference to a page size, and margins which represents printing margins.
 * Children components MUST be SubPages
 */
export const Page = ({ format, margins, children }) => {
    const pageSize = {
        A4: {
            width: 210,
            height: 297,
        },
        B5: {
            width: 176,
            height: 250,
        },
    };

    const pageMargins = {
        standard: {
            top: 10,
            bottom: 5,
            right: 5,
            left: 5,
        },
    };

    // Computation of the size of the writable area of the page
    // defined by the css attributes width and height.
    const width = pageSize[format].width
        - pageMargins[margins].right
        - pageMargins[margins].left;

    const height = pageSize[format].height
        - pageMargins[margins].top
        - pageMargins[margins].bottom;

    const pageStyle = {
        width: `${width}mm`,
        height: `${height}mm`,
        paddingTop: `${pageMargins[margins].top}mm`,
        paddingBottom: `${pageMargins[margins].bottom}mm`,
        paddingRight: `${pageMargins[margins].right}mm`,
        paddingLeft: `${pageMargins[margins].left}mm`,
    };

    return (
        <div className="page" style={pageStyle}>
            { children.filter(e => e.type.name === 'SubPage') }
        </div>
    );
};
Page.propTypes = {
    format: PropTypes.oneOf(['A4', 'B5']),
    margins: PropTypes.oneOf(['standard']),
    children: PropTypes.node.isRequired,
};
Page.defaultProps = {
    format: 'A4',
    margins: 'standard',
};

/**
 * Subpages are rows within the page with the height provided in the property `sectionHeight`.
 * Children components MUST be Columns.
 */
export const SubPage = ({ sectionHeight, children }) => (
    <div className="subPage" style={{ minHeight: sectionHeight }}>
        { children.filter(e => e.type.name === 'Column') }
    </div>
);
SubPage.propTypes = {
    sectionHeight: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

/**
 * Columns are components within SubPages
 */
export const Column = ({ id, align, colWidth, children }) => {
    const flexAlign = {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        auto: 'auto',
    };

    const columnStyle = {
        alignSelf: flexAlign[align],
        flexGrow: colWidth,
    };

    return (
        <div id={id} className="column" style={columnStyle}>
            {children}
        </div>
    );
};
Column.propTypes = {
    id: PropTypes.string,
    colWidth: PropTypes.number,
    align: PropTypes.oneOf(['start', 'end', 'center', 'auto']),
    children: PropTypes.node.isRequired,
};
Column.defaultProps = {
    id: '',
    colWidth: 1,
    align: 'auto',
};
