import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./SignUpForm.css";

function SignUpForm() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let date = new Date();

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(months[date.getMonth()]);
    const [year, setYear] = useState(date.getFullYear());
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        // create birthday from day, month, year
        // must be in the form YYYY-MM-DD
        let bd = [];
        bd.push(year.toString());
        bd.push(month.toString());
        bd.push(day.toString());
        setBirthday(bd.join("-"));

        const user = {
            firstName,
            lastName,
            email,
            password,
            birthday,
            gender
        }

        return dispatch(sessionActions.signup(user))
        .catch(async (res) => {
            let data;
            try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
            } catch {
            data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
    };

    const generateYearOptions = () => {
        const arr = [];
        const startYear = 1905;
        const endYear = new Date().getFullYear();
        for (let i = endYear; i >= startYear; i--) {
            arr.push(<option value={i}>{i}</option>);
        }
        return arr;
    };

    const generateDayOptions = () => {
        const arr = [];
        const startDay = 1;
        const endDay = 31;
        for (let i = startDay; i <= endDay; i++) {
            arr.push(<option value={i}>{i}</option>);
        }
        return arr;
    };

    const generateMonthOptions = () => {
        const arr = [];
        for (let i = 0; i < months.length; i++) {
            arr.push(<option value={months[i]}>{months[i]}</option>);
        }
        return arr;
    };

    return (
        <>
            <div id="sign-up-header">
                <h2>Sign Up</h2>
                <span>It's quick and easy.</span>
            </div>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div className="name-field">
                    <input
                        className="inputText"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={'First name'}
                        required
                    />
                    <input
                        className="inputText"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={'Last name'}
                        required
                    />
                </div>
                <div className="field">
                    <input
                        className="inputText"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email'}
                        required
                    />
                </div>
                <div className="field">
                    <input
                        className="inputPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'New password'}
                        required
                    />
                </div>
                {/* <div id="field">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={'Confirm password'}
                        required
                    />
                </div> */}
                <label className="field-label">Birthday</label>
                <div className="birthday-field">
                    <select
                        name='month'
                        onChange={(e) => setMonth(e.target.value)}
                        value={month}
                    >
                        {generateMonthOptions()}
                    </select>
                    <select
                        name='day'
                        onChange={(e) => setDay(e.target.value)}
                        value={day}
                    >
                        {generateDayOptions()}
                    </select>
                    <select
                        name='year'
                        onChange={(e) => setYear(e.target.value)}
                        value={year}
                    >
                        {generateYearOptions()}
                    </select>
                </div>
                <label className="field-label">Gender</label>
                <div className="gender-field">
                    <div className="ind-gender-field">
                        <label>Male</label>
                        <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className="ind-gender-field">
                        <label>Female</label>
                        <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}/>
                    </div>
                </div>
                <div className="submit-div">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
}



export default SignUpForm;
