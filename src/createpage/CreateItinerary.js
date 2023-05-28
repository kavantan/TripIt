import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./CreateItinerary.css";
import Navbar from "../Navbar";

function CreateItinerary() {
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [preferences, setPreferences] = useState([""]);
    const navigate = useNavigate();
    const options = countryList().getData();

    const handlePreferenceChange = (index, event) => {
        const values = [...preferences];
        values[index] = event.target.value;
        setPreferences(values);
    };

    const handleAddPreference = () => {
        setPreferences([...preferences, ""]);
    };

    const handleCountryChange = (value) => {
        setCountry(value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleGenerateItinerary = (event) => {
        event.preventDefault();

        const itineraryDetails = {
            country,
            startDate,
            endDate,
            preferences,
        };
        /** 
        {
            country: {label: "Singapore", value: "SG"},
            startDate: "2023-05-25",
            endDate: "2023-05-25",
            preferences: ["preference1", "preference2"]
        }
        */
        // For Merrick: Perform ChatGPT API call here, and then replace sampleData with the actual data and parse in the data into /activity
        const sampleData = [
            {
                day: 1,
                activities: [
                    {
                        activity_type: "Day 1 Activity 1",
                        description: "Day 1 Activity 1 Description",
                    },
                    {
                        activity_type: "Day 1 Activity 2",
                        description: "Day 1 Activity 2 Description",
                    },
                ],
            },
            {
                day: 2,
                activities: [
                    {
                        activity_type: "Day 2 Activity 1",
                        description: "Day 2 Activity 1 Description",
                    },
                    {
                        activity_type: "Day 2 Activity 2",
                        description: "Day 2 Activity 2 Description",
                    },
                ],
            },
        ];
        navigate("/activity", { state: { data: sampleData } });
    };

    return (
        <>
            <Navbar />
            <div>
                <div className="background-container">
                    <div className="content">
                        <div className="title">Where are you travelling to?</div>
                        <Select
                            options={options}
                            value={country}
                            onChange={handleCountryChange}
                        />
                        <div className="select-dates">Select Dates of Trip:</div>
                        <div className="date-range-picker">
                            <div className="date-input">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div className="date-input">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="preferences">
                    <div className="pref-title">What are your travel preferences</div>
                    <div className="preference-inputs">
                        {preferences.map((preference, index) => (
                            <div key={index} className="preference-input">
                                <input
                                    type="text"
                                    value={preference}
                                    onChange={(event) => handlePreferenceChange(index, event)}
                                />
                            </div>
                        ))}
                        <button onClick={handleAddPreference}>Add one more preference</button>
                    </div>
                </div>
                <div className="generate-button">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleGenerateItinerary}
                    >
                        Generate Itinerary
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateItinerary;
