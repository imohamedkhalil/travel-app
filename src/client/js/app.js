function app() {
    
    const darkSkyApiKey = '1c393fdf37db87e661886947e0dae64b';
    const pixabayKey = '14995771-9a2a9da27f2491aa1bcf47ed1';
    
    const cityInput = document.getElementById('cityInput');
    const submitButton = document.getElementById('submit');
    const travelDate = document.getElementById('dateInput');
    
    const postData = async ( url = '', data = {})=>{
        console.log("Post Data");
        console.log(data)
        const response = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),       
        }); 
        try {
            const newData = await response.json();
        } catch(error) {
            console.log("error", error);
        }
    }

    async function updateUserInterface(url) {
        let response = await fetch(url);
        const country = document.getElementById('country');
        const lowTemp = document.getElementById('lowTemp');
        const highTemp = document.getElementById('highTemp');
        const image = document.getElementById('image');
        const summary = document.getElementById('summary');
        const city = document.getElementById('city');
        const date = document.getElementById('date');

        try {
            let data = await response.json();
            console.log("Update UI");
            console.log(data);
            country.innerHTML = data.countryName;
            lowTemp.innerHTML = data.lowTemp;
            highTemp.innerHTML = data.highTemp;
            summary.innerHTML = data.summary;
            image.src = data.image;
            city.innerHTML = data.city;
            date.innerHTML = data.date;
        } catch (error) {
            console.log(error);
        }
    }

    function fetchData() { 
        //Calling GeoNames API
        fetch(`http://api.geonames.org/searchJSON?q=${cityInput.value}&maxRows=10&username=imohamedkhalil`)
        .then(response => response.json())
        .then(geonamesData => {
            console.log("Fetch GeoNames");
            console.log(geonamesData);

            //Calling DarkSky API
            fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyApiKey}/${geonamesData.geonames[0].lat},${geonamesData.geonames[0].lng}`)
            .then(response => response.json())
            .then (darkskyData => {
                console.log("Dark Sky API Data");
                console.log(darkskyData);

                //Calling Pixabay API
                fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${cityInput.value}&image_type=photo`)  
                .then(response => response.json())  
                .then(pixabayData => {
                    console.log("pixabay API");
                    console.log(pixabayData);

                    postData('/add', {
                        countryName: geonamesData.geonames[0].countryName,
                        lowTemp: darkskyData.daily.data[0].temperatureLow, 
                        highTemp: darkskyData.daily.data[0].temperatureHigh,
                        summary: darkskyData.daily.data[0].summary,
                        image: pixabayData.hits[0].previewURL,
                        city: cityInput.value,
                        date: travelDate.value
                    });

                    updateUserInterface('/all');
                });   
            });
        });
    }

    submitButton.addEventListener('click', function(){
        fetchData();
    });
}

export {app}

