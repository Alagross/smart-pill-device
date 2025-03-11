

/*
password: the password to be inserted;
count: the number of containers;
*/
let password; 
let count;


/* Creating a container object with the following properties:
    - medication: the type of medication
    - time: what time (hour and minutes)
    - day: what day of the week
    - quanity: how much medication is in the container
    - lock: if true, the lock is enable. if false, disabled
    - empty: if quantity = 0, then true;
    - per: how much medication is meant to be taken at once (two pills a day)
*/ 
function container(medication, time, day, quantity, lock, per) {
    this.medication = medication;
    this.time = time;
    this.day = day;
    this.quantity = quantity;
    this.lock = true;
    if (quantity > 0) {
        this.empty = false;
    } else {
        this.empty = true;
    }
    this.per = per;
    /* Creating a function to refill containers.
        - quantity: the amount of medication refilling in the container
    */
    function refill(quantity) {
        if (!this.lock) {
            this.quantity += quantity;
        }
        if (!check) {
            warning();
        }
        return;
    }
    /* Using this function to check the time at a given time.
    */
    function checkTime() {
        const time = new Date()
        const currentTime = time.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        if (currentTime === this.time) {
            this.lock = false;
        } else {
            this.lock = true;
        }
        return;
    }
    /* Using a special function to indicate taking medication.
    */
    function takeMedication() {
        if (!this.lock) {
            if (check()) {
                this.quantity -= this.per;
            } else {
                warning();
            }
        }
        return;
    }
    /* Function to unlock the container.
        - input: the passsword inputed into the container
    */
    function unlock(input) {
        if (input == password) {
            this.lock = false;
        } else {
            this.lock = true;
        }
        return;
    }
    /* Function to check the current quantity of medication in the container.
    */
    function check() {
        if (this.quantity >= this.per) {
            return true;
        } else {
            return false;
        }
    }
    /* Function to alert the user that they are low on medication.
    */
    function warning() {
        //TODO: Find some way to alert the user that they're low on pills.
    }
}


document.getElementById('adding').addEventListener('click', function () {
    generateContainer();
});

function generateContainer() {
    // Get the input values (hidden from the user)
    const time = document.getElementById('time').value;
    const quantity = document.getElementById('quantity').value;
    const numberToTake = document.getElementById('numberToTake').value;

    // Get the selected days of the week (checkboxes)
    const selectedDays = [];
    const daysOfWeek = document.querySelectorAll('input[type="checkbox"]:checked');
    daysOfWeek.forEach(day => {
        selectedDays.push(day.value);
    });

    // If no days are selected, or if any of the necessary fields are missing, alert the user
    if (selectedDays.length === 0 || !time || !quantity || !numberToTake) {
        alert("Please fill in all fields.");
        return;
    }

    // Create the container item and hide the time, days, quantity, and number to take
    const newItem = document.createElement('div');
    newItem.classList.add('container');
    newItem.classList.add('box');
    
    // For the container display, just show the name (you can show additional details if necessary)
    const containerName = document.getElementById('name').value;

    if (!containerName) {
        alert("Please provide a name for the container.");
        return;
    }
    newItem.textContent = containerName; // Show name in container

    // Store the hidden information (time, days, quantity, numberToTake) in a containerData object
    const containerData = {
        time: time,
        selectedDays: selectedDays,
        quantity: quantity,
        numberToTake: numberToTake
    };

    // Store the containerData object in a custom data attribute of the new item (for backend use)
    newItem.dataset.containerData = JSON.stringify(containerData);

    // Append the new container to the DOM
    document.getElementById('containers').appendChild(newItem);

    // Create and append the "UNLOCK", "DELETE", and "SHOW DETAILS" buttons
    const newButton = document.createElement('button');
    newButton.classList.add('unlock');
    newButton.textContent = 'UNLOCK';

    const newDeleteButton = document.createElement('button');
    newDeleteButton.textContent = 'DELETE';

    const newShowDetailsButton = document.createElement('button');
    newShowDetailsButton.textContent = 'SHOW DETAILS';

    newItem.appendChild(newButton);
    newItem.appendChild(newDeleteButton);
    newItem.appendChild(newShowDetailsButton);

    // Clear the input fields after adding the container
    document.getElementById('name').value = ''; // Clear name input field
    document.getElementById('time').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('numberToTake').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
}

// Event delegation for handling clicks on "UNLOCK", "DELETE", and "SHOW DETAILS" buttons
document.getElementById('containers').addEventListener('click', function (event) {
    // Handle "UNLOCK" button click
    if (event.target.classList.contains('unlock')) {
        const button = event.target;
        const container = button.parentElement;
        toggleColor(container, button);
    }
    
    // Handle "DELETE" button click
    if (event.target.textContent === 'DELETE') {
        const button = event.target;
        const container = button.parentElement;
        container.remove(); // Remove the entire container
    }

    // Handle "SHOW DETAILS" button click
    if (event.target.textContent === 'SHOW DETAILS') {
        const button = event.target;
        const container = button.parentElement;
        showContainerDetails(container); // Show the details of the container
    }
});

// Function to toggle the background color and button text
function toggleColor(container, button) {
    if (container.classList.contains('unlocked')) {
        container.style.backgroundColor = 'palevioletred'; // Locked color
        button.textContent = 'UNLOCK'; // Change button text to "UNLOCK"
        container.classList.remove('unlocked'); // Remove 'unlocked' state
    } else {
        container.style.backgroundColor = 'lightgreen'; // Unlocked color
        button.textContent = 'LOCK'; // Change button text to "LOCK"
        container.classList.add('unlocked'); // Add 'unlocked' state
    }
}

// Function to show the container's hidden details
function showContainerDetails(container) {
    // Retrieve the hidden data from the container's dataset
    const containerData = JSON.parse(container.dataset.containerData);

    // Prepare the data to display
    const details = `
        Time: ${containerData.time}
        Days: ${containerData.selectedDays.join(", ")}
        Quantity: ${containerData.quantity}
        Number to Take: ${containerData.numberToTake}
    `;
    
    // Display the details in an alert or any other way you prefer (such as a modal, etc.)
    alert("Container Details:\n" + details);
}

// Backend Usage: You can access the data as follows
function getContainerData(container) {
    const containerData = JSON.parse(container.dataset.containerData);
    console.log(containerData); // This will log the time, selected days, quantity, and number to take
}

