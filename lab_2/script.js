function createShirts(shirts) {
    container = document.getElementById("tiles-container");

    shirts.forEach(shirt => {
        shirtDiv = document.createElement('div');
        shirtDiv.className = 'shirt-tile';

        shirtName = document.createElement('div');
        shirtName.className = 'shirt-name';
        if (shirt.name && shirt.name.trim() !== "") {
            shirtName.textContent = shirt.name;
        }
        else {
            shirtName.textContent = "Default";
        }

        shirtImage = document.createElement('img');
        shirtImage.className = 'shirt-image';
        if (shirt.colors && Object.keys(shirt.colors).length > 0) {
            firstColor = Object.keys(shirt.colors)[0];
            shirtImage.src = shirt.colors[firstColor].front;
        }
        else {
            shirtImage.src = shirt.default.front;
        }

        colorsText = document.createElement('div');
        colorsText.className = 'colors-text';
        colorsText.textContent = 'Available colors: ' + Object.keys(shirt.colors).length;

        buttonLine = document.createElement('div');
        buttonLine.className = 'buttons-line';

        quickViewButton = document.createElement('div');
        quickViewButton.textContent = 'View';
        quickViewButton.className = 'button';
        quickViewButton.addEventListener('click', () => showQuickView(shirt));

        seePageButton = document.createElement('div');
        seePageButton.textContent = 'See page';
        seePageButton.className = 'button';
        seePageButton.addEventListener('click', () => openDetailView(shirt));

        shirtDiv.appendChild(shirtImage);
        shirtDiv.appendChild(shirtName);
        shirtDiv.appendChild(colorsText);

        buttonLine.appendChild(quickViewButton);
        buttonLine.appendChild(seePageButton);

        shirtDiv.appendChild(buttonLine);

        container.appendChild(shirtDiv);
    });
}

function showQuickView(shirt) {
}

function openDetailView(shirt) {
    localStorage.setItem('currentShirt', shirt.name);
    window.location.href = 'details.html';
}

function createDetailView() {
    container = document.getElementById('container');
    shirt = shirts.find(function (item) {
        return item.name === localStorage.getItem('currentShirt');
      });

    shirtImage = document.createElement('img');
    shirtImage.className = 'shirt-image';
    if (shirt.colors && Object.keys(shirt.colors).length > 0) {
        firstColor = Object.keys(shirt.colors)[0];
        shirtImage.src = shirt.colors[firstColor].front;
    }
    else {
        shirtImage.src = shirt.default.front;
    }

    shirtName = document.createElement('div');
    shirtName.className = 'header';
    if (shirt.name && shirt.name.trim() !== "") {
        shirtName.textContent = shirt.name;
    }
    else {
        shirtName.textContent = "Default";
    }

    shirtDescription = document.createElement('div');
    shirtDescription.textContent = shirt.description;

    shirtPrice = document.createElement('div');
    shirtPrice.textContent = shirt.price;

    frontButton = document.createElement('div');
    frontButton = 'Front';

    backButton = document.createElement('div');
    backtButton = 'Back';

    colorButtons = [];
    for (i = 0; i < Object.keys(shirt.colors).length; i++) {
        colorButtons.push = document.createElement('div');
        
    }

    container.appendChild(shirtName);
    container.appendChild(shirtImage);
    container.appendChild(shirtPrice);
    container.appendChild(shirtDescription);
}