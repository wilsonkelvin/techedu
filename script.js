const students = [
    {
        id: "STU001",
        name: "John Smith",
        course: "Computer Science",
        password: "Student123!",
        certificateGenerated: false,
        certificateId: null
    },

    {
        id: "STU002",
        name: "David James",
        course: "Cybersecurity",
        password: "Student456!",
        certificateGenerated: false,
        certificateId: null
    },

    {
        id: "STU003",
        name: "Mary Johnson",
        course: "Software Engineering",
        password: "Student789!",
        certificateGenerated: false,
        certificateId: null
    }
];


/*
    Store the logged-in student
*/

let currentStudent = null;


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const studentId =
            document
                .getElementById("studentId")
                .value
                .trim()
                .toUpperCase();

        const password =
            document
                .getElementById("password")
                .value;

        const message =
            document.getElementById("loginMessage");


        const student =
            students.find(
                function (item) {
                    return item.id === studentId;
                }
            );


        if (!student) {

            message.textContent =
                "Student ID not found.";

            return;
        }


        if (student.password !== password) {

            message.textContent =
                "Incorrect password.";

            return;
        }


        currentStudent = student;

        generateCertificate();
    }
);


/* =========================
   GENERATE CERTIFICATE
========================= */

function generateCertificate() {

    /*
        ONE-CERTIFICATE RULE
    */

    if (currentStudent.certificateGenerated) {

        showCertificate(
            currentStudent
        );

        alert(
            "This student has already generated a certificate."
        );

        return;
    }


    /*
        Generate unique certificate ID
    */

    currentStudent.certificateId =
        "CERT-" +
        generateRandomId();


    currentStudent.certificateGenerated =
        true;


    showCertificate(
        currentStudent
    );
}


/* =========================
   DISPLAY CERTIFICATE
========================= */

function showCertificate(student) {

    document.getElementById(
        "certificateName"
    ).textContent = student.name;


    document.getElementById(
        "certificateCourse"
    ).textContent = student.course;


    document.getElementById(
        "certificateId"
    ).textContent = student.certificateId;


    document.getElementById(
        "certificateStudentId"
    ).textContent = student.id;


    document.getElementById(
        "certificateDate"
    ).textContent =
        new Date().toLocaleDateString();


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("verifyPage")
        .classList.add("hidden");


    document
        .getElementById("certificatePage")
        .classList.remove("hidden");
}


/* =========================
   GENERATE RANDOM ID
========================= */

function generateRandomId() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < 12; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        result +=
            characters[randomIndex];
    }

    return result;
}


/* =========================
   LOGOUT
========================= */

function logout() {

    currentStudent = null;

    document
        .getElementById("certificatePage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("loginForm")
        .reset();
}


/* =========================
   VERIFY PAGE
========================= */

document
    .getElementById("verifyPageButton")
    .addEventListener(
        "click",
        function () {

            document
                .getElementById("loginPage")
                .classList.add("hidden");

            document
                .getElementById("verifyPage")
                .classList.remove("hidden");
        }
    );


function showLogin() {

    document
        .getElementById("verifyPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");
}


/* =========================
   CERTIFICATE VERIFICATION
========================= */

document
    .getElementById("verifyForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const enteredId =
                document
                    .getElementById("verifyId")
                    .value
                    .trim()
                    .toUpperCase();

            const result =
                document.getElementById(
                    "verifyResult"
                );


            /*
                Search the certificate
                in our student records.
            */

            const student =
                students.find(
                    function (item) {

                        return (
                            item.certificateId ===
                            enteredId
                        );

                    }
                );


            if (!student) {

                result.innerHTML = `
                    <div class="invalid">

                        <h2>
                            ❌ Invalid Certificate
                        </h2>

                        <p>
                            This certificate could
                            not be found.
                        </p>

                    </div>
                `;

                return;
            }


            result.innerHTML = `
                <div class="valid">

                    <h2>
                        ✅ Certificate Verified
                    </h2>

                    <p>
                        <strong>Name:</strong>
                        ${student.name}
                    </p>

                    <p>
                        <strong>Student ID:</strong>
                        ${student.id}
                    </p>

                    <p>
                        <strong>Programme:</strong>
                        ${student.course}
                    </p>

                    <p>
                        <strong>Certificate ID:</strong>
                        ${student.certificateId}
                    </p>

                </div>
            `;
        }
    );