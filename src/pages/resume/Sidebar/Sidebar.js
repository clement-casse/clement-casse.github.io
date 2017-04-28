import React from "react";

import "./sidebar.css";

export const Sidebar = ({lang, data, handler}) => {

    // A Sidebar major title whose title is localized
    const SectionTitle = ({localizedTitle, lang}) => {
        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle ;
        return (<h3>{displayedTitle}</h3>);
    }

    // A Sidebar section description whose text is localized
    const SectionDesc = ({localizedDesc, lang}) => {
        const displayedDesc = (typeof localizedDesc === 'object')
            ? localizedDesc[lang]
            : localizedDesc ;
        return (<p>{displayedDesc}</p>);
    }

    // A link to an external resource with a Fontawesome icon whose data.text is localized
    const Link = ({lang, data}) => {
        const displayedText = (typeof data["text"] === 'object')
            ? data["text"][lang]
            : data["text"] ;
        return(
            <a href={data.url}>
                <i className={`fa ${data.icon}`} /> {displayedText}
            </a>
        )
    }

    // Wrap the `Link` component into a list 
    const AllLinks = ({lang, list}) => {
        const entries = list.map((entry) => {
            return (
                <li key={entry.key}>
                    <Link lang={lang} data={entry} />
                </li>
            )
        });
        return (
            <ul className="list-unstyled">
                {entries}
            </ul>
        )
    }

    const ConfigMenu = ({lang, dataConfig}) => {

        //TODO implement language selector
        //TODO Implement print button
        const SelectLangMenuTitle = (typeof dataConfig["LangMenu"]["title"] === 'object')
            ? dataConfig["LangMenu"]["title"][lang]
            : dataConfig["LangMenu"]["title"];

        const print = () => {
            window.print();
        }

        return (
            <div>
                <SectionTitle
                    localizedTitle={dataConfig.title}
                    lang={lang}
                />
                <SectionDesc
                    localizedDesc={dataConfig.text}
                    lang={lang}
                />
            </div>
        )
    }

    if (typeof data === 'undefined') {
        return (<div>Placeholer</div>)
    }

    return (
        <div className="sidebar">
            <ConfigMenu 
                lang={lang}
                dataConfig={data.config}
            />
            <hr />
            <SectionTitle
                localizedTitle={data.links.title}
                lang={lang}
            />
            <AllLinks
                list={data.links.list}
                lang={lang}
            />
            <hr />
        </div>
    );
};

export default Sidebar;