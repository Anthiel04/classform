class student {
    constructor(name, email, subject) {
        this.name = `<div class="grid-item name"><p>${name}</p></div>`;
        // this.week.classList.add("grid-item name")
        this.email = `<div class="grid-item email"><p>${email}</p></div>`;
        // this.week.classList.add("grid-item email")
        this.subject = `<div class="grid-item subject"><p>${subject}</p></div>`;
        // this.week.classList.add("grid-item subject")
        this.week = `<div class="grid-item week">
            <select name="week" id="week" required>
                <option value="" selected hidden disabled></option>
                <option value="1"> Week 1</option>
                <option value="2"> Week 2</option>
                <option value="3"> Week 3</option>
                <option value="4"> Week 4</option>
                <option value="5"> Week 5</option>
                <option value="6"> Week 6</option>
                <option value="7"> Week 7</option>
                <option value="8"> Week 8</option>
            </select>
        </div>`;
    }
}
// Form
// Data
const fname = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
// Validation
const buttonS = document.getElementById("submit");
// Error
const errorBox = document.getElementById("error")
const closeButton = document.createElement("button");
closeButton.classList.add('button')
const errormsg = document.getElementById('errormsg')
// Success
const buttonY = document.createElement("button");
const buttonN = document.createElement("button");
buttonY.classList.add('button', 'green', 'validate');
buttonY.setAttribute('id', 'Yes');
buttonY.innerHTML = "Yes";
buttonN.classList.add('button', 'red', 'validate');
buttonN.setAttribute('id', 'No');
buttonN.innerHTML = "No";
// Features
const delButtonCross = document.querySelectorAll(".shadow")
const inputbox = [fname, email, subject];
// Grid
const maingrid = document.querySelector(".grid")
// Navigation
const back = document.getElementById("back");
const main = document.getElementsByTagName("section")
// Navigation function
back.addEventListener("click", function () {
    locationW();
})
function locationW() {
    const coordinates = window.scrollY;
    console.log(coordinates);
    if (coordinates == 0) {
        return 0;
    } else if (coordinates > 600 && coordinates < 1000) {
        main[0].scrollIntoView({ behavior: 'smooth' });
        return 0;
    } else {
        main[1].scrollIntoView({ behavior: 'smooth' });
        return 0
    }
}
// Visuals
const classRemover = () => {
    buttonS.classList.remove("red");
    errorBox.classList.remove("red");
    closeButton.classList.remove("red")
    errormsg.classList.remove("red")
    buttonS.classList.remove("green");
    errorBox.classList.remove("green");
    closeButton.classList.remove("green")
    errormsg.classList.remove("green")
    errorBox.classList.remove("slide-in");
    errorBox.classList.add("slide-out");
}
const classAdd = (color) => {
    if (color == "red") {
        closeButton.setAttribute('id', 'closeButton')
        closeButton.innerHTML = "Close";
        buttonS.classList.add("red");
        errorBox.classList.add("red");
        closeButton.classList.add("red");
        errormsg.classList.add("red")
        errorBox.classList.remove("slide-out");
        errorBox.classList.add("slide-in");
    } else {
        buttonS.classList.add("green");
        errorBox.classList.add("green");
        errormsg.classList.add("green")
        errorBox.classList.remove("slide-out");
        errorBox.classList.add("slide-in");
    }
}
closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    classRemover();
});
// Form Validation
function yesNo() {
    buttonY.addEventListener('click', (e) => {
        e.preventDefault()
        return classRemover();
    })
    buttonN.addEventListener('click', (e) => {
        e.preventDefault();
        main[2].scrollIntoView({ behavior: 'smooth' });
        return classRemover()
    })
    buttonN.removeEventListener('click', function(e){})
    buttonY.removeEventListener('click', function(e){})
}
function validate() {
    if (fname.value.length < 5 || fname.value.length > 40) {
        classAdd("red");
        errormsg.innerHTML = `<b>Name</b> must be between 5 and 40`;
        errormsg.append(closeButton)
        return console.log(fname.value.length)
    } else if (email.value.length < 10 || email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
        classAdd("red");
        errormsg.innerHTML = "<b>Email</b> must contain:  </br> - @ symbol </br> - .  symbol </br> - At least 12 characters";
        errormsg.append(closeButton)
        return console.log(email.value.length)
    } else if (subject.value == "") {
        classAdd("red");
        errormsg.innerHTML = "You must select a <b>subject</b>";
        errormsg.append(closeButton)
        return console.log(subject.value)
    } else {
        classAdd();
        errormsg.innerHTML = "<b>Data</b> sent succesfully<br>Add another <b>student</b>?";
        div = document.createElement('div')
        div.classList.add('buttonflex')
        div.appendChild(buttonY);
        div.appendChild(buttonN);
        errorBox.append(div);
        return 0
    }
}
// Features
document.addEventListener('click', function (event) {
    let temp = event.target.outerHTML;
    if (event.target.matches('.shadow') || event.target.matches('.circle')) {
        if (temp.indexOf('shadow 0') > -1 || temp.indexOf('circle 0') > -1) {
            inputbox[0].value = "";
        } else if (temp.indexOf('shadow 1') > -1 || temp.indexOf('circle 1') > -1) {
            inputbox[1].value = "";
        } else if (temp.indexOf('shadow 2') > -1 || temp.indexOf('circle 2') > -1) {
            inputbox[2].value = "";
        }
    }
    console.log('Se ha clickeado el elemento:', temp);
});


const students = [];
buttonS.addEventListener("click", (e) => {
    e.preventDefault()
    if (validate() == 0) {
        students.push(new student(fname.value, email.value, subject.value));
        let temp = document.createDocumentFragment();
        const tempObj = Object.keys(students).map(key => {
            const student = students[key];
            return `${student.name}${student.email}${student.subject}${student.week}`;
        }).join(' ');

        temp.innerHTML = tempObj;

        maingrid.innerHTML = temp.innerHTML;
        console.log(tempObj);

        yesNo();
    }
});
