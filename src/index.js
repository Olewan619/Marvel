import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelService();

const fetchData = async () => {
  try {
    const allCharactersResponse = await marvelService.getAllCharacters();
    allCharactersResponse.data.results.forEach((item) =>
      console.log(item.name)
    );

    const characterResponse = await marvelService.getCharacter(1009148);
    characterResponse.data.results.forEach((item) => console.log(item.name));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
