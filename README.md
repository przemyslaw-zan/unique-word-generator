Unique word generator
=====================

This library generates a word that (most likely) does not exist in English language yet. It does that by mixing random parts of two already existing english words together. By using existing words, results sound a lot more believable than random string of characters.

## Usage

```js
import getUniqueWord from 'unique-word-generator';

const options = {
	prefix: 'foo',
	maxLength: 10
};

const result = getUniqueWord( options );

console.log( result.word );
```

## Options

None of those options are required. They can be used to influence the outcome of the randomness.

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`prefix`</td>
			<td rowspan="2">`string`</td>
			<td rowspan="2">Word to use as the source for the new word.</td>
		</tr>
		<tr>
			<td>`suffix`</td>
		</tr>
		<tr>
			<td>`useFullPrefix`</td>
			<td rowspan="2">`boolean`</td>
			<td rowspan="2">Whether to use the entire word instead of random part of it.</td>
		</tr>
		<tr>
			<td>`useFullSuffix`</td>
		</tr>
		<tr>
			<td>`minLength`</td>
			<td rowspan="2">`number`</td>
			<td>Minimal lenght of the generated word. This value can not exceed 20.</td>
		</tr>
		<tr>
			<td>`maxLength`</td>
			<td>Maximal length of the generated word. This value can not be lower than 2.</td>
		</tr>
	</tbody>
</table>

## Output

Object with following values is returned buy the function:

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`word`</td>
			<td>`string`</td>
			<td>Freshly generated word.</td>
		</tr>
		<tr>
			<td>`prefix`</td>
			<td rowspan="2">`string`</td>
			<td rowspan="2">Component string used to generate the word.<br></td>
		</tr>
		<tr>
			<td>`suffix`</td>
		</tr>
		<tr>
			<td>`prefixSource`</td>
			<td rowspan="2">`string`</td>
			<td>Word that was used as a source of the component string used to generate the word. This value is absent if `useFullPrefix` option was set to `true`.</td>
		</tr>
		<tr>
			<td>`suffixSource`</td>
			<td>Word that was used as a source of the component string used to generate the word. This value is absent if `useFullSuffix` option was set to `true`.</td>
		</tr>
		<tr>
			<td>`prefixCutIndex`</td>
			<td rowspan="2">`number`</td>
			<td>Index along which source word was split. This value is absent if `useFullPrefix` option was set to `true`.</td>
		</tr>
		<tr>
			<td>`suffixCutIndex`</td>
			<td>Index along which source word was split. This value is absent if `useFullSuffix` option was set to `true`.</td>
		</tr>
		<tr>
			<td>error</td>
			<td>`array<string>`</td>
			<td>Mutually exclusive with all other values. Contains array of strings with descriptions of errors that happened.</td>
		</tr>
	</tbody>
</table>

## Errors

When error happens, it is included in the array `errors` of the returned object. In such case, all other values are absent from the returned object. Errors are caused by faulty options:
- `minLength` / `maxLength` are not numbers
- `minLength` above 20
- `maxLength` below 2
- `minLength` above `maxLength`
- Such combination of `prefix`, `suffix`, `useFullPrefix` and `useFullSuffix` options that makes fulfillment of passed or default values of `minLength` or `maxLength` impossible
