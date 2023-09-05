import React from "react";
import { Route, Routes } from 'react-router-dom';

import { linksArray } from "./components/Sidebar/Sidebar";
import HomePage from "./pages/HomePage";
import TextToHTML from "./pages/TextToHTML";
import FileUpload from "./pages/FileUpload";
import URLShortener from "./pages/URLShortener";
import WebCrawler from "./pages/WebCrawler";
import Weather from "./pages/Weather";

interface ComponentsMap {
    [key: string]: React.ComponentType;
}

const componentsMap: ComponentsMap = {
    '/': HomePage,
    '/texttohtml': TextToHTML,
    '/fileupload': FileUpload,
    '/urlshortener': URLShortener,
    '/webcrawler': WebCrawler,
    // '/newsproject': NewsProject,
    // '/jobportal': JobPortal,
    '/weather': Weather,
    // '/chat': Chat,
    // '/musicplayer': MusicPlayer,
    // '/dictionary': Dictionary,
    // '/blog': Blog,
    // '/votingsystem': VotingSystem,
    // '/calling': VideoAudioCalling,
    // '/quiz': Quiz,
    // '/railwayreservation': RailwayReservation,
    // '/plotroutes': PlotRoutes,
    // '/caloriescalculator': CaloriesCalculator,
    // '/notekeeper': NoteKeeper,
    // '/busreservation': BusReservation,
    // '/location': Location,
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {linksArray.map(link => (
                <Route key={link.to} path={link.to} element={React.createElement(componentsMap[link.to])} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
