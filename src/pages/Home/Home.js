import Header from "../../components/Header/Header";
import "./Home.css"

import AddIcon from '@mui/icons-material/Add';

const technicians = [
    {
        name: "Bob",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Alice",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Charlie",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Diana",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Eve",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Frank",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Grace",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Hank",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Ivy",
        turns: ["Manicure", "Nail Art"]
    },
    {
        name: "Jack",
        turns: ["Gel Nails", "Manicure"]
    },
    {
        name: "Karen",
        turns: ["Acrylic Nails", "Pedicure"]
    },
    {
        name: "Leo",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Mia",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Nina",
        turns: ["Pedicure", "Gel Nails"]
    },
    {
        name: "Oscar",
        turns: ["Manicure", "Nail Art"]
    },
];


const Home = () => {
    return (
        <>
            <Header />
            <div className="home__turn-tracker-container">
                <div className="home__turn-tracker-header">
                    Hi
                </div>
                <div className="home__turn-tracker-wrapper">
                    {technicians.map((technician, techIndex) =>
                        <div key={techIndex} className="home__turn-tracker-row">
                            <div className="technician_name">
                                {technician.name}
                            </div>
                            {technician.turns.map((turn, turnIndex) =>
                                <button key={`${techIndex} ${turnIndex}`} className="turn-box">
                                    {turn.substring(0, 3)}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;