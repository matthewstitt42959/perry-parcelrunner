export const fetchWithTimeout = (url, options, timeout = 5000) => {

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Request timed out"));
        }, timeout);
        fetch(url, options)
            .then((response) => {
                console.log("I am here: ");
                clearTimeout(timer);
                //Clear the timeout when the request is successful
                resolve(response);

            })
            .catch((err) => {
                clearTimeout(timer);
                //Clear when there is an error
                reject(err);
            })
    });
};

    //Function to handle paste event
    export const handlePaste = (e) => {
        //Get the pasted data as plain text
        const pastedData = e.clipboardData.getData('text');
        //Validate the pasted URL before allowing it to be processed
        try {
            const parsedURL = new URL(pastedData);
            //If valid then paste
            //setUrl(pastedData);
            //Format the display URL to show only protocol, hostname, and pathname (no query params)
            const formattedUrl = `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.pathname}`;

            // setUrl(formattedUrl);

        } catch (error) {
            e.preventDefault();
            alert('Invalid URL pasted');
        }
    };