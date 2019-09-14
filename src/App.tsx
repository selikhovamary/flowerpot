import React from "react";
import store from "./store";
import { observer } from "mobx-react";
import Settings from "./helpers/Settings";
import SettingsView from "./views/SettingsView";
import CredentialsView from "./views/CredentialsView";
import SelectQueriesView from "./views/SelectQueriesView";
import ErrorView from "./views/ErrorView";
import MainView from "./views/MainView";
import LoadingView from "./views/LoadingView";
import DebugView from "./views/DebugView";
import Electron from "./helpers/Electron";
import ListsView from "./views/ListsView";

@observer
export default class App extends React.Component {
    componentDidMount() {
        Electron.reactIsReady();

        Settings.read();

        Electron.checkForUpdates(true);

        if (Electron.isDev()) {
            store.switchView("debug");
            //store.switchView("main");
        } else {
            if (store.settings.credentialsChecked) store.switchView("main");
            else store.switchView("credentials");
        }

        this.registrator();
    }

    registrator() {}

    render() {
        switch (store.view) {
            case "loading":
                return <LoadingView />;
            case "error":
                return <ErrorView />;
            case "main":
                return <MainView />;
            case "settings":
                return <SettingsView />;
            case "credentials":
                return <CredentialsView />;
            case "selectqueries":
                return <SelectQueriesView />;
            case "lists":
                return <ListsView />;
            case "debug":
                return <DebugView />;
            default:
                return <MainView />;
        }
    }
}
