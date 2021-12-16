import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Successfully added the exercise!');
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push('/');
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Exercise name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                value={reps}
                placeholder="Number of reps..."
                onChange={(e) => setReps(e.target.value)}
            />
            <input
                type="number"
                value={weight}
                placeholder="Weight lifted..."
                onChange={(e) => setWeight(e.target.value)}
            />
            {/*
            <input
                list="units"
                placeholder="Enter units here"
                id="units"
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
            />
            */}
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="" disable defaultValue hidden>
                    Select...
                </option>
                <option value="LBs">LBs</option>
                <option value="KGs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Date: MM-DD-YY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                minLength="8"
                maxLength="8"
                size="20"
            />
            <button
                onClick={(e) => {
                    addExercise();
                    e.preventDefault();
                }}
            >
                Add
            </button>
        </div>
    );
};

export default CreateExercisePage;
