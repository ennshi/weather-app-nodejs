const FetchCityListController = () => {
    let controller = null;
    const createController = () => {
        controller = new AbortController();
    };
    const getController = () => {
        return controller;
    };
    const abortAndUnsetController = () => {
        controller.abort();
        controller = null;
    };
    return { createController, getController, abortAndUnsetController }
};
export default FetchCityListController;
