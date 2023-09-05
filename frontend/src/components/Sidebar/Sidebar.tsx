import React, { useContext, useRef, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import { AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";

import {
    FaHome,
    FaChartBar,
    FaFileUpload,
    FaLink,
    FaSpider,
    FaNewspaper,
    FaBriefcase,
    FaCloudSun,
    FaComments,
    FaMusic,
    FaBook,
    FaBlog,
    FaVoteYea,
    FaPhone,
    FaQuestionCircle,
    FaTrain,
    FaMapMarkedAlt,
    FaCalculator,
    FaStickyNote,
    FaBus,
    FaMapMarkerAlt,
} from 'react-icons/fa';

import { ThemeContext } from "./../../App";
import { useLocation } from "react-router-dom";

interface Link {
    label: string;
    icon: JSX.Element;
    to: string;
    notification: number;
}

export const linksArray: Link[] = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/",
        notification: 0,
    },
    {
        label: "Text To HTML",
        icon: <FaChartBar />,
        to: "/texttohtml",
        notification: 0,
    },
    {
        label: "File Upload",
        icon: <FaFileUpload />,
        to: "/fileupload",
        notification: 0,
    },
    {
        label: "URL Shortener",
        icon: <FaLink />,
        to: "/urlshortener",
        notification: 0,
    },
    {
        label: "Web Crawler",
        icon: <FaSpider />,
        to: "/webcrawler",
        notification: 0,
    },
    {
        label: "News Project",
        icon: <FaNewspaper />,
        to: "/newsproject",
        notification: 0,
    },
    {
        label: "Job Portal",
        icon: <FaBriefcase />,
        to: "/jobportal",
        notification: 0,
    },
    {
        label: "Weather",
        icon: <FaCloudSun />,
        to: "/weather",
        notification: 0,
    },
    {
        label: "Chat",
        icon: <FaComments />,
        to: "/chat",
        notification: 0,
    },
    {
        label: "Music Player",
        icon: <FaMusic />,
        to: "/musicplayer",
        notification: 0,
    },
    {
        label: "Dictionary",
        icon: <FaBook />,
        to: "/dictionary",
        notification: 0,
    },
    {
        label: "Blog",
        icon: <FaBlog />,
        to: "/blog",
        notification: 0,
    },
    {
        label: "Voting System",
        icon: <FaVoteYea />,
        to: "/votingsystem",
        notification: 0,
    },
    {
        label: "Video and Audio Calling",
        icon: <FaPhone />,
        to: "/calling",
        notification: 0,
    },
    {
        label: "Quiz",
        icon: <FaQuestionCircle />,
        to: "/quiz",
        notification: 0,
    },
    {
        label: "Railway Reservation",
        icon: <FaTrain />,
        to: "/railwayreservation",
        notification: 0,
    },
    {
        label: "Plot Routes",
        icon: <FaMapMarkedAlt />,
        to: "/plotroutes",
        notification: 0,
    },
    {
        label: "Calories Calculator",
        icon: <FaCalculator />,
        to: "/caloriescalculator",
        notification: 0,
    },
    {
        label: "Note Keeper",
        icon: <FaStickyNote />,
        to: "/notekeeper",
        notification: 0,
    },
    {
        label: "Bus Reservation",
        icon: <FaBus />,
        to: "/busreservation",
        notification: 0,
    },
    {
        label: "Location",
        icon: <FaMapMarkerAlt />,
        to: "/location",
        notification: 0,
    },
];

interface ThemeProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = () => {
    const searchRef = useRef<HTMLInputElement | null>(null);
    const [searchResults, setSearchResults] = useState<Link[]>([]);
    const themeContext = useContext<ThemeProps | null>(ThemeContext);
    const { setTheme, theme } = themeContext || { setTheme: () => {}, theme: "" };
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const { pathname } = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
        setSearchOpen(false); // Close search input when toggling sidebar
        setSearchResults([]); // Clear search results
    };

    const searchClickHandler = () => {
        setSidebarOpen(true);
        setSearchOpen(true);
        setTimeout(() => {
            if (searchRef.current) {
                searchRef.current.focus();
            }
        }, 0);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredLinks = linksArray.filter((link) =>
            link.label.toLowerCase().includes(searchTerm)
        );

        setSearchResults(filteredLinks);
    };

    return (  
        <SSidebar isOpen={sidebarOpen}>
            <SSidebarButton isOpen={sidebarOpen} onClick={toggleSidebar}>
                <AiOutlineLeft />
            </SSidebarButton>
            <SSearch
                onClick={searchClickHandler}
                style={!sidebarOpen ? { width: "fit-content" } : {}}
            >
                <SSearchIcon>
                    <AiOutlineSearch />
                </SSearchIcon>
                {searchOpen && (
                    <input
                        ref={searchRef}
                        placeholder="Search"
                        style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
                        onChange={handleSearchInputChange}
                    />
                )}
            </SSearch>
            <SDivider />
            {searchOpen
                ? searchResults.map(({ icon, label, notification, to }) => (
                      <SLinkContainer key={label} isActive={pathname === to}>
                          <SLink to={to} style={!sidebarOpen ? { width: "fit-content" } : {}}>
                              <SLinkIcon>{icon}</SLinkIcon>
                              {sidebarOpen && (
                                  <>
                                      <SLinkLabel>{label}</SLinkLabel>
                                      {!!notification && (
                                          <SLinkNotification>{notification}</SLinkNotification>
                                      )}
                                  </>
                              )}
                          </SLink>
                      </SLinkContainer>
                  ))
                : linksArray.map(({ icon, label, notification, to }) => (
                      <SLinkContainer key={label} isActive={pathname === to}>
                          <SLink to={to} style={!sidebarOpen ? { width: "fit-content" } : {}}>
                              <SLinkIcon>{icon}</SLinkIcon>
                              {sidebarOpen && (
                                  <>
                                      <SLinkLabel>{label}</SLinkLabel>
                                      {!!notification && (
                                          <SLinkNotification>{notification}</SLinkNotification>
                                      )}
                                  </>
                              )}
                          </SLink>
                      </SLinkContainer>
                  ))}
            <SDivider />
            {sidebarOpen && (
                <STheme>
                    <SThemeLabel>Dark Mode</SThemeLabel>
                    <SThemeToggler
                        isActive={theme === "dark"}
                        onClick={() => setTheme && setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                    >
                        <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                    </SThemeToggler>
                </STheme>
            )}
        </SSidebar>
    );
};

export default Sidebar;
