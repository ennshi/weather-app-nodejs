const mainContainer = document.getElementById('main-container');
const errorMessage = document.getElementById('error-message');
const searchButton = document.getElementById('submit');

export const renderInfo = (message, namePic) => {
    if(!(message === 'The user aborted a request.')) {
        errorMessage.textContent = message;
        mainContainer.innerHTML = `<img id="${namePic}" src="/images/${namePic}.gif" alt="${namePic}">`;
    }
};

export const cleanUI = () => {
    mainContainer.innerHTML = '';
    errorMessage.textContent = '';
};

export const disableSearchButton = () => {
    searchButton.disabled = true;
};

export const enableSearchButton = () => {
    searchButton.disabled = false;
};
