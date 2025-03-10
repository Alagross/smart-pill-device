

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
            alert();
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
                alert();
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
    function alert() {
        //TODO: Find some way to alert the user that they're low on pills.
    }
}


document.getElementById('adding').addEventListener('click', function () {
    generateContainer();
});

function generateContainer() {
    const newItem = document.createElement('div');
    newItem.classList.add('container');
    newItem.classList.add('box');
    newItem.textContent = 'Test';
    document.getElementById('containers').appendChild(newItem);

    const newButton = document.createElement('button');
    newButton.textContent = 'UNLOCK';

    newItem.appendChild(newButton);
    
}