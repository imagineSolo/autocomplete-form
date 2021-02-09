import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/users';
import './Autocomplete.css';

const Autocomplete = (props) => {
	const [activeSuggestion, setActiveSuggestion] = useState(0);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [userInput, setUserInput] = useState('');

	useEffect(() => {
		console.log(props.users);
		if (!props.users.length) {
			props.getUsers();
			console.log(props.users);
		}
	}, [props]);

	const onChange = (e) => {
		console.log(props.users);
		const filteredOptions = props.users.filter(
			(option) =>
				option.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1
		);

		setActiveSuggestion(0);
		setFilteredSuggestions(filteredOptions);
		setShowSuggestions(true);
		setUserInput(e.currentTarget.value);
	};

	const onClick = (e) => {
		setActiveSuggestion(0);
		setFilteredSuggestions([]);
		setShowSuggestions(false);
		setUserInput(e.currentTarget.innerText);
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			setActiveSuggestion(0);
			setShowSuggestions(false);
			setUserInput(filteredSuggestions[activeSuggestion]);
		} else if (e.keyCode === 38) {
			if (activeSuggestion === 0) {
				return;
			}
			setActiveSuggestion(activeSuggestion - 1);
		} else if (e.keyCode === 40) {
			if (activeSuggestion === filteredSuggestions.length - 1) {
				return;
			}
			setActiveSuggestion(activeSuggestion + 1);
		}
	};

	let suggestionsListComponent;

	if (showSuggestions && userInput) {
		suggestionsListComponent = (
			<ul className='autocomplete-items'>
				{filteredSuggestions.map((item, i) => {
					return (
						<li
							className={i === activeSuggestion ? 'item-active' : null}
							key={item}
							value={item}
							onClick={onClick}
						>
							{item}
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<form autoComplete='off'>
			<input
				className={'autocomplete'}
				type='text'
				name='Usernames'
				placeholder='username...'
				value={userInput}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<input type='submit' value='Submit' className='submit' />
			{suggestionsListComponent}
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		users: state.users.users,
	};
};

const mapDispatchToProps = {
	getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
