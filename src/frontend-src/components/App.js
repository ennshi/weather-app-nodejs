import FetchCityListController from "./FetchCityListController";
import CityListService from "../services/CityListService";
import {renderCityList} from "./CityListView";
import {inputHelper} from "../helpers/searchHelpers";
import {cleanUI, disableSearchButton, enableSearchButton, renderInfo} from "../helpers/UIhelpers";

const App = () => {
    const searchInput = document.getElementById('search');
    const searchForm = document.getElementById('search-form');
    const mainContainer = document.getElementById('main-container');

    const {getController, abortAndUnsetController, createController} = FetchCityListController();
    const {fetchCityList, showWholeCityList, showTopCityList} = CityListService();

    searchInput.addEventListener('input', async () => {
        const search = inputHelper(searchInput.value);
        if(search.length > 1) {
            if(getController()) {
                abortAndUnsetController();
                cleanUI();
            }
            createController();
            const signal = getController().signal;
            try {
                renderInfo('Loading...', 'sand-clock');
                const cities = await fetchCityList(search, signal);
                const cityList = renderCityList(showTopCityList(cities, search), mainContainer);
                cleanUI();
                mainContainer.append(cityList);
            } catch (e) {
                renderInfo(e.message, 'cloud');
            }
            enableSearchButton();
        } else {
            cleanUI();
            disableSearchButton();
        }
    });
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const search = inputHelper(searchInput.value);
        try {
            renderInfo('Loading...', 'sand-clock');
            const cities = await fetchCityList(search, null);
            const cityList = renderCityList(showWholeCityList(cities, search), mainContainer);
            cleanUI();
            mainContainer.append(cityList);
        } catch (e) {
            renderInfo(e.message, 'cloud');
        }
    });
};

export default App;
