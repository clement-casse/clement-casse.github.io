import React from 'react';
import PropTypes from 'prop-types';

import './sidebar.css';

const Sidebar = ({ lang, data, handlers }) => {
    if (!data) {
        return null;
    }
    const sections = data.sections.map(section => (
        <SidebarSection
            title={section.title}
            text={section.text}
            menu={section.menu}
            lang={lang}
            handlers={handlers}
            key={section.id}
        />
    ));

    return (
        <div className="sidebar">
            <h1>{data.head[lang]}</h1>
            {sections}
        </div>
    );
};
Sidebar.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.shape({
        head: PropTypes.objectOf(PropTypes.string),
        sections: PropTypes.arrayOf(PropTypes.object),
    }),
    handlers: PropTypes.objectOf(PropTypes.func),
};
Sidebar.defaultProps = {
    handlers: {
        print: window.print,
    },
    data: null,
};

const SidebarSection = ({ title, text, menu, lang, handlers }) => {
    /**
     * Displays between H2 the provided title depending on the `lang` var.
     * Expects `sectionTitle` property to be an object whose keys are language identifiers.
     */
    const SectionTitle = ({ sectionTitle }) => {
        const displayedTitle = sectionTitle[lang];
        return (<h2>{displayedTitle}</h2>);
    };
    SectionTitle.propTypes = {
        sectionTitle: PropTypes.objectOf(PropTypes.string),
    };
    SectionTitle.defaultProps = {
        sectionTitle: null,
    };

    /**
     * Displays as (a group of) paragraph the object passed as property `sectionText` based
     * on `lang` variable.
     * Expects an array or a simple object like { "en": "Hi", "fr": "salut"}
     */
    const SectionText = ({ sectionText }) => {
        if (Array.isArray(sectionText)) {
            // recursive call on arrays on each elements
            return sectionText.map((element, index) => (
                <SectionText sectionText={element} key={index} />
            ));
        }

        const sectionTextType = typeof sectionText;

        if (sectionTextType === 'object' && !!sectionText[lang]) {
            return (<p>{sectionText[lang]}</p>);
        }

        if (sectionTextType === 'string') {
            return (<p>{sectionText}</p>);
        }
        return null;
    };
    SectionText.propTypes = {
        sectionText: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
            PropTypes.objectOf(PropTypes.string),
            PropTypes.string,
        ]),
    };
    SectionText.defaultProps = {
        sectionText: undefined,
    };

    /**
     * Generate an inline Fontawsome icon identified by prop `faIcon`.
     */
    const Icon = ({ faIcon }) => {
        if (!faIcon) {
            return null;
        }
        return (<span className={`fa ${faIcon} fa-fw`} />);
    };
    Icon.propTypes = {
        faIcon: PropTypes.string,
    };
    Icon.defaultProps = {
        faIcon: null,
    };

    /**
     * Create a line of buttons whose clicking action is a key of the object `handler`
     */
    const ButtonGroup = ({ entries }) => {
        const buttons = entries.map(
            entry => (
                <button
                    className={(entry.id === lang) ? 'btn-current' : 'btn-available'}
                    key={entry.id}
                    onClick={handlers[entry.handler]}
                >
                    <Icon faIcon={entry.icon} />
                    {entry.text}
                </button>
            ));
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    };
    ButtonGroup.propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            icon: PropTypes.string,
            text: PropTypes.string,
            handler: PropTypes.string.isRequired,
        })),
    };
    ButtonGroup.defaultProps = {
        entries: null,
    };

    /**
     * Generates a list of links with a trailing optionnal FontAwesome Icon.
     */
    const LinksGroup = ({ entries }) => {
        const links = entries.map(
            entry => (
                <li key={entry.id}>
                    <a href={entry.url} >
                        <Icon faIcon={entry.icon} />
                        {entry.text[lang]}
                    </a>
                </li>
            ));
        return (
            <ul className="list-unstyled">
                {links}
            </ul>
        );
    };
    LinksGroup.propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            icon: PropTypes.string,
            text: PropTypes.objectOf(PropTypes.string),
        })),
    };
    LinksGroup.defaultProps = {
        entries: null,
    };

    let sectionMenu = null;
    switch (menu.type) {
        case 'button-group': {
            sectionMenu = (<ButtonGroup entries={menu.entries} />);
            break;
        }
        case 'link-list': {
            sectionMenu = (<LinksGroup entries={menu.entries} />);
            break;
        }
        default:
            sectionMenu = null;
    }

    return (
        <div className="sidebar-section">
            <SectionTitle sectionTitle={title} />
            <SectionText sectionText={text} />
            {sectionMenu}
        </div>
    );
};
SidebarSection.propTypes = {
    title: PropTypes.objectOf(PropTypes.string),
    text: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
        PropTypes.objectOf(PropTypes.string),
        PropTypes.string,
    ]),
    menu: PropTypes.shape({
        type: PropTypes.string,
        entries: PropTypes.arrayOf(PropTypes.object),
    }),
    lang: PropTypes.string.isRequired,
    handlers: PropTypes.objectOf(PropTypes.func),
};
SidebarSection.defaultProps = {
    title: undefined,
    text: undefined,
    menu: null,
    handlers: {
        print: window.print,
    },
};

export default Sidebar;
