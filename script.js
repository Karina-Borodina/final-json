// function to perform a GET request
async function httpGet(theUrl) {
    const response = await fetch(theUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// function to search breed and get image and description
async function searchBreed(event) {
    event.preventDefault(); // Prevent the form from submitting
    const breedInput = document.getElementById('breedInput').value;
    if (!breedInput) {
        alert('Please enter a dog breed');
        return;
    }

    try {
        // Get the breed description
        await getBreedDescription(breedInput);
        // Get a random image of the breed
        await getBreedImage(breedInput);
    } catch (error) {
        console.error('Error fetching breed info:', error);
    }
}

// function to get breed description from The Dog API
async function getBreedDescription(breed) {
    try {
        const apiKey = 'live_ D5DJ5Z4AHCALWafYmhNjMUZgHiVihb M1s1ycXqyGd6Owi10hixfRmoox65zY Uy08';
        const breeds = await httpGet(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
        console.log(breeds);

        // Find the breed info
        const breedInfo = breeds.find(b => b.name.toLowerCase() === breed.toLowerCase());
        console.log(breedInfo);

        let description = 'Извините, описание породы не доступно в базе';
        if (breedInfo) {
            description = `Порода: ${breedInfo.name}\n`;
            description += breedInfo.temperament ? `Темперамент: ${breedInfo.temperament}\n` : '';
            description += breedInfo.origin ? `Происхождение: ${breedInfo.origin}\n` : '';
            description += breedInfo.life_span ? `Продолжительность жизни: ${breedInfo.life_span}` : '';
        }
        console.log(description);

        // Update the breed description in the DOM
        const descriptionElement = document.getElementById('breedDescription');
        descriptionElement.innerText = description;
    } catch (error) {
        console.error('Error fetching breed description:', error);
        const descriptionElement = document.getElementById('breedDescription');
        descriptionElement.innerText = 'Извините, описание породы не доступно в базе';
    }
}

// function to get breed image from Dog CEO's API
async function getBreedImage(breed) {
    try {
        const data = await httpGet(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
        console.log(data);

        // Get the image url from the response
        const url = data.message;
        console.log(url);

        // Get the image object
        const image = document.getElementById('dogImage');

        // Set the src of the image object
        image.src = url;
        image.alt = '';
    } catch (error) {
        console.error('Error fetching breed image:', error);
        const image = document.getElementById('dogImage');
        image.src = '';
        image.alt = 'Извините, фото породы не доступно в базе';
    }
}

// function to get a random breed and its info
async function getRandomBreed() {
    try {
        const apiKey = 'your-dog-api-key';
        const breeds = await httpGet(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
        console.log(breeds);

        const randomIndex = Math.floor(Math.random() * breeds.length);
        const randomBreed = breeds[randomIndex].name.toLowerCase();
        
        await getBreedDescription(randomBreed);
        await getBreedImage(randomBreed);
    } catch (error) {
        console.error('Error fetching random breed info:', error);
    }
}

document.getElementById('submit').addEventListener('submit', searchBreed);
document.getElementById('random').addEventListener('click', getRandomBreed);

