const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSucessStatus: 200
}
app.use(cors(corsOptions))

const port = 4000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



/*const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.set('views', '../src/pages')
const PORT = process.env.PORT || 3003;







//const { connectDB } = require("./db");
//require("dotenv").config({ path: "./config/config.env" });



const servicesRoute = require("./routes/services");
const employeesRoute = require("./routes/employees");
const scheduleRoute = require("./routes/schedule");
const appointmentsRoute = require("./routes/appointment");
const clientsRoute = require("./routes/clients");
const userSettingsRoute = require("./routes/userSettings");

// Routes
app.use("/api/services", servicesRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/settings", userSettingsRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// GET CALL EXAMPLE
/*
const reloadServices = async () => {
    try {
        const response = await fetch("/api/services", {
            method: "GET",
        })

        const responseData = await response.json();

        if (response.ok) {
            setServices(responseData);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
*/
// POST CALL EXAMPLE
/*
const addStaff = async () => {
    const newStaff = {
        ...selectedStaff,
        name: staffName
    }

    try {
        const response = await fetch(editingStaff ? `/api/employees/update/data?id=${newStaff._id}` : "/api/employees/add",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStaff)
            })

        const responseData = await response.json();

        if (response.ok) {
            closeNewStaffModal();
            reloadEmployees();
        } else {
            alert(responseData.message);
            console.error(response.statusText);
        }
    } catch (error) {
        console.error('Error adding staff:', error);
    }
}*/
