const apiRequest = async (url, optionsObj) => {
    try {
       const response = await fetch(url, optionsObj);
        return response;
    } catch (err) {
        return err.message;
    }
}

export default apiRequest;