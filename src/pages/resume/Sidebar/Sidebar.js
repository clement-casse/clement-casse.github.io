import React from "react";

import "./sidebar.css";

export const Sidebar = ({lang, data, handlerChangeLang}) => {

    // A Sidebar major title whose title is localized
    const SectionTitle = ({localizedTitle, lang}) => {
        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle ;
        return (<h2>{displayedTitle}</h2>);
    }

    // A Sidebar section description whose text is localized
    const SectionDesc = ({localizedDesc, lang}) => {
        const displayedDesc = (typeof localizedDesc === 'object')
            ? localizedDesc[lang]
            : localizedDesc ;
        return (<p>{displayedDesc}</p>);
    }

    const LangToggleButton = ({menuDesc}) => {
        if (!menuDesc.entries) {
            return null;
        }
        const buttons = menuDesc.entries.map((entry) => {
            return (
                <button className={(entry.key === lang) ? "btn-current" : "btn-available"}
                        key={entry.key} 
                        onClick={(e) => handlerChangeLang(entry.key)} >
                    {entry.text}
                </button>
            );
        });
        
        return (
            <div>
                <h3>{menuDesc.title[lang]}</h3>
                <div class="btn-group">
                    {buttons}
                </div>
            </div>
        );
    }

    const PrintButton = (props) => {
        const title = {
            fr: "Imprimer",
            en: "Print"
        }

        return (
            <div>
                <h3>{title[lang]}</h3>
                <div class="btn-group">
                    <button onClick={window.print}>
                        <span className="fa fa-print fa-fw" />
                    </button>
                </div>
            </div>
        );
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
        const SelectLangMenuTitle = (typeof dataConfig["LangMenu"]["title"] === 'object')
            ? dataConfig["LangMenu"]["title"][lang]
            : dataConfig["LangMenu"]["title"];
        
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
                <LangToggleButton menuDesc={dataConfig.LangMenu} />
                <PrintButton />
            </div>
        )
    }

    if (typeof data === 'undefined') {
        return (<div>Placeholer</div>)
    }

    return (
        <div className="sidebar">
            <h1>- CV -</h1>
            <ConfigMenu 
                lang={lang}
                dataConfig={data.config}
            />
            <div>
                <SectionTitle
                    localizedTitle={data.links.title}
                    lang={lang}
                />
                <AllLinks
                    list={data.links.list}
                    lang={lang}
                />
            </div>
        </div>
    );
};

export default Sidebar;