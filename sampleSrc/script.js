import getUniqueWord from '../src/index';

const DISPLAY_AMOUNT = 5;

initApp();

function initApp () {
	generateBackground();

	const generatedWords = [];
	const displaySlots = initWordDisplay();
	initGenerateButton( generatedWords, displaySlots );
}

function generateBackground () {
	const background = document.querySelector( '.background' );

	const backgroundText = Array( 1000 )
		.fill()
		.map( () => getUniqueWord( { minLength: 4, maxLength: 8 } ).word )
		.join( ' ' );

	background.innerHTML += backgroundText;
}

function initGenerateButton ( generatedWords, displaySlots ) {
	const generateButton = document.querySelector( '.app button' );

	const inputs = {
		prefix: document.querySelector( '.app .settings input[name="prefix"]' ),
		suffix: document.querySelector( '.app .settings input[name="suffix"]' ),
		useFullPrefix: document.querySelector( '.app .settings input[name="useFullPrefix"]' ),
		useFullSuffix: document.querySelector( '.app .settings input[name="useFullSuffix"]' ),
		minLength: document.querySelector( '.app .settings input[name="minLength"]' ),
		maxLength: document.querySelector( '.app .settings input[name="maxLength"]' )
	};

	generateButton.addEventListener( 'click', () => {
		const options = {};

		if ( inputs.prefix.value ) options.prefix = inputs.prefix.value;
		if ( inputs.suffix.value ) options.suffix = inputs.suffix.value;
		if ( inputs.useFullPrefix.checked ) options.useFullPrefix = true;
		if ( inputs.useFullSuffix.checked ) options.useFullSuffix = true;
		if ( inputs.minLength.value ) options.minLength = Number( inputs.minLength.value );
		if ( inputs.maxLength.value ) options.maxLength = Number( inputs.maxLength.value );

		const newWord = getUniqueWord( options );

		if ( newWord.errors ) {
			window.alert( newWord.errors.join( '\n' ) );
		} else {
			generatedWords.unshift( newWord );
			updateWordDisplay( generatedWords, displaySlots );
		}
	} );
}

function initWordDisplay () {
	const displayList = document.querySelector( '.app ul' );
	const displaySlots = [];

	for ( let i = 0; i < DISPLAY_AMOUNT; i++ ) {
		const item = document.createElement( 'li' );
		item.style.opacity = ( DISPLAY_AMOUNT - i ) / DISPLAY_AMOUNT;
		item.innerHTML = '&nbsp;';
		displayList.append( item );
		displaySlots.push( item );
	}

	return displaySlots;
}

function updateWordDisplay ( generatedWords, displaySlots ) {
	const wordsToDisplay = generatedWords.slice( 0, DISPLAY_AMOUNT );

	for ( let i = 0; i < wordsToDisplay.length; i++ ) {
		displaySlots[ i ].innerHTML = wordsToDisplay[ i ].word;
	}
}
