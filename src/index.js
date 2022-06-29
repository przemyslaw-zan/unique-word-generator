import words from 'an-array-of-english-words';

const ATTEMPTS_LIMIT = 1_000_000;
const MAX_LENGTH_LIMIT = 2;
const MIN_LENGTH_LIMIT = 20;
const DEFAULT_MAX_LENGTH = 100;
const DEFAULT_MIN_LENGTH = 0;

export default function getUniqueWord ( options = {} ) {
	options.maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH;
	options.minLength = options.minLength ?? DEFAULT_MIN_LENGTH;

	const errors = validateOptions( options );

	if ( errors.length ) {
		return { errors };
	}

	for ( let i = 1; i < ATTEMPTS_LIMIT; i++ ) {
		const result = generator( options );

		const tooShort = result.word.length < options.minLength;
		const tooLong = result.word.length > options.maxLength;

		if ( !tooShort && !tooLong ) {
			return result;
		}
	}

	return {
		errors: [ 'Exceeded the limit of generation attempts.' ]
	};
}

function generator ( options ) {
	const result = {};

	const prefix = options.prefix || getRandomElement( words );
	const suffix = options.suffix || getRandomElement( words );

	if ( options.useFullPrefix ) {
		result.prefix = prefix;
	} else {
		result.prefixSource = prefix;
		result.prefixCutIndex = getRandomIndex( result.prefixSource ) || 1;
		result.prefix = result.prefixSource.slice( 0, result.prefixCutIndex );
	}

	if ( options.useFullSuffix ) {
		result.suffix = suffix;
	} else {
		result.suffixSource = suffix;
		result.suffixCutIndex = getRandomIndex( result.suffixSource );
		result.suffix = result.suffixSource.slice( result.suffixCutIndex );
	}

	result.word = result.prefix + result.suffix;

	return result;
}

function getRandomElement ( item ) {
	return item[ Math.floor( Math.random() * item.length ) ];
}

function getRandomIndex ( item ) {
	return Math.floor( Math.random() * item.length );
}

function validateOptions ( options ) {
	const errors = [];

	if ( typeof options.minLength !== 'number' ) {
		errors.push( 'Option "minLength" has to be a number.' );
	}

	if ( typeof options.maxLength !== 'number' ) {
		errors.push( 'Option "maxLength" has to be a number.' );
	}

	if ( errors.length ) {
		return errors;
	}

	if ( options.maxLength < MAX_LENGTH_LIMIT ) {
		errors.push( `Option "maxLength" can not be lower than ${ MAX_LENGTH_LIMIT }.` );
	}

	if ( options.minLength > MIN_LENGTH_LIMIT ) {
		errors.push( `Option "minLength" can not be higher than ${ MIN_LENGTH_LIMIT }.` );
	}

	if ( options.minLength > options.maxLength ) {
		errors.push( 'Option "minLength" can not be higher than option "maxLength".' );
	}

	if ( errors.length ) {
		return errors;
	}

	if ( !errors.length && options.prefix && options.suffix ) {
		const minPrefixLength = options.useFullPrefix ? options.prefix.length : 1;
		const minSuffixLength = options.useFullSuffix ? options.suffix.length : 1;
		const minPossibleLength = minPrefixLength + minSuffixLength;
		const maxPossibleLength = options.prefix.length + options.suffix.length;

		if ( minPossibleLength > options.maxLength ) {
			errors.push( `Given options will never yield word that satisfies current "maxLength" of ${ options.maxLength }.` );
		}

		if ( maxPossibleLength < options.minLength ) {
			errors.push( `Given options will never yield word that satisfies current "minLength" of ${ options.minLength }.` );
		}
	}

	return errors;
}
