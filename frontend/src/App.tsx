import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout/Layout";
import Routes from "./AppRoutes";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

interface ThemeContextType {
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    theme: string;
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const App: React.FC = () => { // fc = functional component
    const [theme, setTheme] = useState<string>("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <ThemeProvider theme={themeStyle}>
                <GlobalStyle />
                <Helmet>
                    <title>Sidebar</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <Layout>
                    <Routes />
                </Layout>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default App;
