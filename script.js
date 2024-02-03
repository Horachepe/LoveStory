const container = document.getElementById('container');
const object = document.getElementById('moveableObject');
const heartButton = document.getElementById('heartButton');
const message = document.getElementById('message');
const secondObject = document.getElementById('secondObject');

const speed = 10;
let hasCollided = false;
let storedInput;

let positionX = container.clientWidth / 2 - object.clientWidth / 2;
let positionY = container.clientHeight / 2 - object.clientHeight / 2;

heartButton.addEventListener('click', playMusic);

function spawnSecondObject() {

    secondObject.className = 'bow';

    secondObject.style.visibility = 'visible';
}

function playMusic() {
    const audio = new Audio('The Blue Danube, Op. 314.mp3');
    audio.play();

    heartButton.style.visibility = 'hidden';
    message.style.visibility = 'hidden';
    object.style.visibility = 'visible';

    const messageElement = document.createElement('div');
    messageElement.innerText = 'Wow! What a beautiful sqaure! Try moving around with the arrow keys!';
    messageElement.style.fontSize = '24px';
    messageElement.style.color = 'white';
    container.appendChild(messageElement);

    setTimeout(() => {
        container.removeChild(messageElement);

        displayNewMessage();

    }, 10000);
}

function displayNewMessage() {
    const newMessageElement = document.createElement('div');
    newMessageElement.innerText = 'Okay, time to get ready!';
    newMessageElement.style.fontSize = '24px';
    newMessageElement.style.color = 'white';
    container.appendChild(newMessageElement);

    hasCollided = false;

    window.addEventListener('keydown', function resetHasCollided() {
        hasCollided = false;
        window.removeEventListener('keydown', resetHasCollided);
    });

    setTimeout(() => {
        container.removeChild(newMessageElement);

        spawnSecondObject();
    }, 5000);
}

function moveObject(keyCode) {
    if (hasCollided) {
        return;
    }
    
    switch (keyCode) {
        case 'ArrowUp':
            positionY -= speed;
            break;
        case 'ArrowDown':
            positionY += speed;
            break;
        case 'ArrowLeft':
            positionX -= speed;
            break;
        case 'ArrowRight':
            positionX += speed;
            break;
    }

    object.style.top = `${positionY}px`;
    object.style.left = `${positionX}px`;

    if (checkCollision(object, secondObject)) {
        // Check if the collision has already been handled
        if (!hasCollided) {
            // Collision occurred, handle accordingly
            bowCollision();
        }
    }
}

function checkCollision(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    return (
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left
    );
}

function bowCollision() {
    // Hide the bow
    secondObject.style.visibility = 'hidden';

    // Display a message
    const collisionMessage = document.createElement('div');
    collisionMessage.innerText = 'How Coquette!';
    collisionMessage.style.fontSize = '24px';
    collisionMessage.style.color = 'white';
    container.appendChild(collisionMessage);

    object.style.backgroundImage = "url('cutepinky.png')";
    object.style.backgroundSize = 'contain';  // Adjust as needed
    // Remove the message after a certain duration
    setTimeout(() => {
        container.removeChild(collisionMessage);
        
        createNewObject();

        hasCollided = false;
    }, 5000);
}

function createNewObject() {
    const newObjectMessage = document.createElement('div');
    newObjectMessage.innerText = 'Oooo Who is that?';
    newObjectMessage.style.fontSize = '24px';
    newObjectMessage.style.color = 'white';
    container.appendChild(newObjectMessage);

    // Create and append a new image object
    const newImage = document.createElement('img');
    newImage.src = 'blue.png'; // Replace with the actual path to your image
    newImage.alt = 'New Object Image';
    newImage.style.width = '65px'; // Adjust the width as needed
    newImage.style.height = '65px'; // Adjust the height as needed
    newImage.style.position = 'absolute';
    newImage.style.top = '50%';
    newImage.style.left = '200%';
    newImage.style.transform = 'translate(-50%, -50%)';
    container.appendChild(newImage);

    window.addEventListener('keydown', function checkCollisionWithNewObject(event) {
        if (checkCollision(object, newImage)) {
            window.removeEventListener('keydown', checkCollisionWithNewObject);
            handleCollisionWithNewObject();
        }
    });
}

function handleCollisionWithNewObject() {
    // Display a modal or pop-up box with Yes and No buttons
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: red; /* Change background color here */
        padding: 20px;
        border: 1px solid red;
        width: 300px; /* Adjust width as needed */
        height: 200px; /* Adjust height as needed */
    `;

    const message = document.createElement('div');
    message.innerText = 'Will you be my valentine?';
    message.style.marginBottom = '50px';
    message.style.fontSize = '24px';
    message.style.textAlign = 'center';

    const yesButton = document.createElement('button');
    yesButton.innerText = 'Yes';
    yesButton.style.fontSize = '35px'; // Increase font size for the button
    yesButton.style.marginRight = '165px'; // Add margin for spacing
    yesButton.addEventListener('click', () => {
        // Handle 'Yes' button click
        container.removeChild(modal);
        showNewScreen();
    });

    const noButton = document.createElement('button');
    noButton.innerText = 'No';
    noButton.style.fontSize = '35px'; // Increase font size for the button
    noButton.addEventListener('click', () => {
        // Handle 'No' button click
        container.removeChild(modal);
        container.removeChild(newImage);
    });

    modal.appendChild(message);
    modal.appendChild(yesButton);
    modal.appendChild(noButton);

    container.appendChild(modal);
}

function showNewScreen() {
    // Create a new screen element
    const newScreen = document.createElement('div');
    newScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: url('ladybug.gif'); /* Change background image here */
        background-size: 50% 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const newScreenMessage = document.createElement('div');
    newScreenMessage.innerText = 'Te amo!';
    newScreenMessage.style.fontSize = '32px';
    newScreenMessage.style.color = 'red';
    newScreen.appendChild(newScreenMessage);

    const openLinkButton = document.createElement('button');
    openLinkButton.innerText = 'Maybe a surprise?';
    openLinkButton.style.fontSize = '24px';
    openLinkButton.style.marginTop = '20px'; // Adjust margin as needed

    openLinkButton.style.margin = 'auto';

    openLinkButton.addEventListener('click', () => {
        // Replace 'https://example.com' with your desired URL
        window.location.href = 'https://www.wizard101.com/home/game/gcactivate/76Q4G-9L9Y8-75G4C-92QQ6';
    });

    newScreen.appendChild(openLinkButton);

    container.appendChild(newScreen);
}

window.addEventListener('keydown', (event) => {
    moveObject(event.key);
});