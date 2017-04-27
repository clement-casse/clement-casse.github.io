import "./layout.css"

export const SubPage = ({sectionHeight, children}) => {
    children = children.filter(e => e.type.name === "Column");
    return (
        <div className="subPage" style={{minHeight: sectionHeight}}>
            {children}
        </div>
    );
}

export const Column = ({id, align, colWidth, children}) => {
    const flexAlign = {
        start: "flex-start",
        end: "flex-end",
        center: "center"
    };

    let displayedStyle = {
        alignSelf: flexAlign[align] || "auto"
    }

    if (typeof colWidth === 'number'){
        displayedStyle["flexGrow"] = colWidth
    }
    else if (typeof colWidth === 'string') {
        displayedStyle["width"] = colWidth
    }

    return (
        <div id={id} className="column" style={displayedStyle}>
            {children}
        </div>
    );
}

export const Page = ({format, margins, children}) => {
    const paperSize = {
        A4: {
            width: 210,
            height: 297
        },
        B5: {
            width: 176,
            height: 250
        }
    };

    const paperMargins = {
        standard: {
            top: 10,
            bottom: 5,
            right: 5,
            left: 5
        }
    };

    const pageDimensions = {
        width: paperSize[format].width + 'mm',
        height: paperSize[format].height + 'mm',
        paddingTop: paperMargins[margins].top + 'mm',
        paddingBottom: paperMargins[margins].bottom + 'mm',
        paddingRight: paperMargins[margins].right + 'mm',
        paddingLeft: paperMargins[margins].left + 'mm'
    };

    children = children.filter(e => e.type.name === "SubPage");

    return (
        <div className="page" style={pageDimensions}>
            {children}
        </div>
    );
};

Page.propTypes = {
    format: React.PropTypes.oneOf(['A4', 'B5']),
    margins: React.PropTypes.oneOf(['standard'])
}

Page.defaultProps = {
    format: "A4",
    margins: "standard"
}