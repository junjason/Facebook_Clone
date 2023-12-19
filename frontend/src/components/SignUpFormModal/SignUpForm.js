import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./SignUpForm.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(months[date.getMonth()]);
    const [year, setYear] = useState(date.getFullYear());
    const [birthday, setBirthday] = useState(date);
    const [gender, setGender] = useState("");
    const [customGender, setCustomGender] = useState("");
    const [pronoun, setPronoun] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (password !== confirmPassword) {
            setErrors(["Password and Confirm Password do not match"]);
            return;
        }    

        // add logic to pronoun based on gender
        if (pronoun === "") {
            if (gender === "Male") {
                setPronoun("He");
            }
            else if (gender === "Female") {
                setPronoun("She");
            }
        }

        if (gender === "Custom") {
            setGender(customGender);
        }

        const user = {
            first_name,
            last_name,
            email,
            password,
            birthday,
            gender,
            pronoun
        }

        await dispatch(sessionActions.signup(user))
        history.push('/home');
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

    const generatePronounOptions = () => {
        const arr = [];
        arr.push(<option value="She">She: "Wish her a happy birthday!"</option>);
        arr.push(<option value="He">He: "Wish him a happy birthday!"</option>);
        arr.push(<option value="They">They: "Wish them a happy birthday!"</option>);
        return arr;
    };

    return (
        <>
            <div id="sign-up-header">
                <h2>Sign Up</h2>
                <span>It's quick and easy.</span>
            </div>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div className="sign-up-name-field">
                    <input
                        className="sign-up-inputText"
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={'First name'}
                        required
                    />
                    <input
                        className="sign-up-inputText"
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={'Last name'}
                        required
                    />
                </div>
                <div className="sign-up-field">
                    <input
                        className="sign-up-inputText"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Email'}
                        required
                    />
                </div>
                <div className="sign-up-field">
                    <input
                        className="sign-up-inputPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'New password'}
                        required
                    />
                </div>
                {password && (
                    <div className="sign-up-field">
                        <input
                            className="sign-up-inputPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={'Confirm password'}
                            required
                        />
                    </div>
                )}
                <label className="sign-up-field-label">Birthday</label>
                <div className="sign-up-birthday-field">
                    <select
                        name='month'
                        onChange={(e) => {setMonth(e.target.value); setBirthday(year.toString()+'-'+e.target.value.toString()+'-'+day.toString())}}
                        value={month}
                    >
                        {generateMonthOptions()}
                    </select>
                    <select
                        name='day'
                        onChange={(e) => {setDay(e.target.value); setBirthday(year.toString()+'-'+month.toString()+'-'+e.target.value.toString())}}
                        value={day}
                    >
                        {generateDayOptions()}
                    </select>
                    <select
                        name='year'
                        onChange={(e) => {setYear(e.target.value); setBirthday(e.target.value.toString()+'-'+month.toString()+'-'+day.toString())}}
                        value={year}
                    >
                        {generateYearOptions()}
                    </select>
                </div>
                <label className="sign-up-field-label">Gender</label>
                <div className="sign-up-gender-field">
                    <div className="sign-up-ind-gender-field">
                        <label>Male</label>
                        <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className="sign-up-ind-gender-field">
                        <label>Female</label>
                        <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}/>
                    </div>
                    <div className="sign-up-ind-gender-field">
                        <label>Custom</label>
                        <input type="radio" name="gender" value="Custom" onChange={(e) => setGender(e.target.value)}/>
                    </div>
                </div>
                {gender === "Custom" && (
                    <>
                        <div className="sign-up-pronoun-field">
                            <select
                                className=""// add styling
                                name='year'
                                onChange={(e) => setPronoun(e.target.value)}
                                value={pronoun}
                            >
                                {generatePronounOptions()}
                            </select>
                        </div>
                        <label className="sign-up-pronoun-label">Your pronoun is visible to everyone.</label>
                    </>
                )}
                {gender === "Custom" && (
                    <div className="sign-up-field" id="gender-custom-field">
                        <input
                            className="sign-up-inputText"
                            type="text"
                            value={customGender}
                            onChange={(e) => setCustomGender(e.target.value)}
                            placeholder={'Gender (optional)'}
                        />
                    </div>
                )}
                <div className="sign-up-submit-div">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
}



export default SignUpForm;
