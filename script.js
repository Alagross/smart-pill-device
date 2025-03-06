
/* Creating a container object with the following properties:
    - medication: the type of medication
    - time: what time (hour and minutes)
    - day: what day of the week
    - quanity: how much medication is in the container
    - lock: if true, the lock is enable. if false, disabled
    - empty: if quantity = 0, then true;
*/ 
let password; 
function container(medication, time, day, quantity, lock) {
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
    /* Creating a function to refill containers.
        - quantity: the amount of medication refilling in the container
    */
    function refill(quantity) {
        if (!this.lock) {
            this.quantity += quantity;
        }
        return;
    }
    function checkTime() {
        const time = new Date()
        const currentTime = time.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        if (currentTime === this.time) {
            this.lock = false;
        } else {
            this.lock = true;
        }
    }
    function takeMedication() {
        if (!this.lock) {
            this.quantity += quantity;
        }
        return;
    }
    return;
    function unlock(input) {
        if (input == password) {
            this.lock = false;
        } else {
            this.lock = true;
        }
    }
}