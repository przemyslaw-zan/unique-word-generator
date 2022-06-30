Unique word generator
=====================

This library generates a word that (most likely) does not exist in English language yet. It does that by mixing random parts of two already existing english words together. By using existing words, results sound a lot more believable than random string of characters. To see example implementation of the library, go [here](https://przemyslaw-zan.github.io/unique-word-generator/).

## Usage

Import with ES modules...

```js
import getUniqueWord from 'unique-word-generator';
```

...or with CommonJS...

```js
const getUniqueWord = require( 'unique-word-generator' );
```

... and execute!

```js
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
			<td><code>prefix</code></td>
			<td rowspan="2"><code>string</code></td>
			<td rowspan="2">Word to use as the source for the new word.</td>
		</tr>
		<tr>
			<td><code>suffix</code></td>
		</tr>
		<tr>
			<td><code>useFullPrefix</code></td>
			<td rowspan="2"><code>boolean</code></td>
			<td rowspan="2">Whether to use the entire word instead of random part of it.</td>
		</tr>
		<tr>
			<td><code>useFullSuffix</code></td>
		</tr>
		<tr>
			<td><code>minLength</code></td>
			<td rowspan="2"><code>number</code></td>
			<td>Minimal lenght of the generated word. <strong>This value can not exceed 20.</strong></td>
		</tr>
		<tr>
			<td><code>maxLength</code></td>
			<td>Maximal length of the generated word. <strong>This value can not be lower than 2.</strong></td>
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
			<td><code>word</code></td>
			<td rowspan="5"><code>string</code></td>
			<td>Freshly generated word.</td>
		</tr>
		<tr>
			<td><code>prefix</code></td>
			<td rowspan="2">Component string used to generate the word.<br></td>
		</tr>
		<tr>
			<td><code>suffix</code></td>
		</tr>
		<tr>
			<td><code>prefixSource</code></td>
			<td>Word that was used as a source of the component string used to generate the word. Absent if <code>useFullPrefix</code> option was set to <code>true</code>.</td>
		</tr>
		<tr>
			<td><code>suffixSource</code></td>
			<td>Word that was used as a source of the component string used to generate the word. Absent if <code>useFullSuffix</code> option was set to <code>true</code>.</td>
		</tr>
		<tr>
			<td><code>prefixCutIndex</code></td>
			<td rowspan="2"><code>number</code></td>
			<td>Index along which source word was split. Absent if <code>useFullPrefix</code> option was set to <code>true</code>.</td>
		</tr>
		<tr>
			<td><code>suffixCutIndex</code></td>
			<td>Index along which source word was split. Absent if <code>useFullSuffix</code> option was set to <code>true</code>.</td>
		</tr>
		<tr>
			<td><code>error</code></td>
			<td><code>array&lt;string&gt;</code></td>
			<td><strong>Mutually exclusive with all other values.</strong> Contains array of strings with descriptions of errors.</td>
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
