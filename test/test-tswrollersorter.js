QUnit.module("tswrollsorter.condense");
QUnit.test("matches people with same roll", function(assert) {
	// Test matches people with same roll
	var data = [
		{person: "Person1", roll: "28"},
		{person: "Person2", roll: "28"}
	];
	var expected = [
		{people: ["Person1", "Person2"], roll: "28"}
	];
	assert.deepEqual(tswrollsorter.condense(data), expected);
});

QUnit.module("tswrollsorter.extract");
QUnit.test("invalid string", function(assert) {
	// Test invalid string
	var data = '[04:36] Person rolled a pineapple.\n' +
		'[04:36] Person rolled a 8b2.';
	var expected = [];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("numbers of digit range", function(assert) {
	// Test numbers of digit range
	var data = '[04:36] Person rolled a 3.\n' +
		'[04:36] Person rolled a 82.' +
		'[04:36] Person rolled a 100.';
	var expected = [
		{person: "Person", roll: "3"},
		{person: "Person", roll: "82"},
		{person: "Person", roll: "100"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("with timestamp + newline", function(assert) {
	// Test with timestamp + newline
	var data = '[04:36] Person rolled a 39.\n' +
		'[04:36] Person rolled a 82.';
	var expected = [
		{person: "Person", roll: "39"},
		{person: "Person", roll: "82"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("without timestamp + newline", function(assert) {
	// Test without timestamp + newline
	var data = 'Person rolled a 39.\n' +
		'Person rolled a 82.';
	var expected = [
		{person: "Person", roll: "39"},
		{person: "Person", roll: "82"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("with timestamp + no newline", function(assert) {
	// Test with timestamp + no newline
	var data = '[04:36] Person rolled a 39.' +
		'[04:36] Person rolled a 82.';
	var expected = [
		{person: "Person", roll: "39"},
		{person: "Person", roll: "82"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("without timestamp + no newline", function(assert) {	
	// Test without timestamp + no newline
	var data = 'Person rolled a 39.' +
		'Person rolled a 82.';
	var expected = [
		{person: "Person", roll: "39"},
		{person: "Person", roll: "82"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.test("names with numbers and hyphens", function(assert) {
	// Test names with numbers and hyphens
	var data = 'Per-son rolled a 39.' +
		'Per100son rolled a 82.';
	var expected = [
		{person: "Per-son", roll: "39"},
		{person: "Per100son", roll: "82"}
	];
	assert.deepEqual(tswrollsorter.extract(data), expected);
});

QUnit.module( "tswrollsorter.filter" );
QUnit.test("remove duplicate", function(assert) {
	// Test remove duplicate
	var data = [
		{person: "Person5", roll: "10"},
		{person: "Person", roll: "60"},
		{person: "Person", roll: "20"},
		{person: "Person3", roll: "70"}
	];
	var expected = [
		{person: "Person5", roll: "10"},
		{person: "Person", roll: "60"},
		{person: "Person3", roll: "70"}
	];
	assert.deepEqual(tswrollsorter.filter(data), expected);
});

QUnit.module( "tswrollsorter.sort" );
QUnit.test("sort ordered list", function(assert) {
	// Test ordered list
	var data = [
		{person: "Person2", roll: "100"},
		{person: "Person3", roll: "82"},
		{person: "Person1", roll: "3"}
	];
	var expected = [
		{person: "Person2", roll: "100"},
		{person: "Person3", roll: "82"},
		{person: "Person1", roll: "3"}
	];
	assert.deepEqual(tswrollsorter.sort(data), expected);
});

QUnit.test("sort unordered list", function(assert) {
	// Test ordered list
	var data = [
		{person: "Person2", roll: "10"},
		{person: "Person3", roll: "30"},
		{person: "Person1", roll: "20"}
	];
	var expected = [
		{person: "Person3", roll: "30"},
		{person: "Person1", roll: "20"},
		{person: "Person2", roll: "10"}
	];
	assert.deepEqual(tswrollsorter.sort(data), expected);
});

QUnit.test("number of digits doesn't affect sort", function(assert) {
	// Test number of digits doesn't affect sort
	var data = [
		{person: "Person2", roll: "28"},
		{person: "Person3", roll: "6"},
		{person: "Person1", roll: "100"}
	];
	var expected = [
		{person: "Person1", roll: "100"},
		{person: "Person2", roll: "28"},
		{person: "Person3", roll: "6"}
	];
	assert.deepEqual(tswrollsorter.sort(data), expected);
});

QUnit.module( "tswrollsorter.format_roll" );
QUnit.test("1 person with roll", function(assert) {
	var data = { 
		people: ["Person1"], 
		roll: "28"
	};
	var expected = { 
		text: "Person1 (28)", 
		num_rolls: 1
	};
	assert.deepEqual(tswrollsorter.format_roll(data), expected);
});

QUnit.test("2 people with roll", function(assert) {
	var data = {
		people: ["Person1", "Person2"], 
		roll: "28"
	};
	var expected = {
		text: "Person1 + Person2 (28)", 
		num_rolls: 2
	};
	assert.deepEqual(tswrollsorter.format_roll(data), expected);
});

QUnit.test("3 people with roll", function(assert) {
	var data = {
		people: ["Person1", "Person2", "Person3"], 
		roll: "28"
	};
	var expected = {
		text: "Person1 + Person2 + Person3 (28)", 
		num_rolls: 3
	};
	assert.deepEqual(tswrollsorter.format_roll(data), expected);
});

QUnit.module( "tswrollsorter.format_rolls" );
QUnit.test("1 roll", function(assert) {
	var data = [
		{ people: ["Person1"], roll: "28"}
	];
	var expected = { 
		text: "Person1 (28)", num_rolls: 1
	};
	assert.deepEqual(tswrollsorter.format_rolls(data), expected);
});

QUnit.test("2 rolls", function(assert) {
	var data = [
		{ people: ["Person1"], roll: "28" },
		{ people: ["Person2"], roll: "25" }
	];
	var expected = { 
		text: "Person1 (28) -- Person2 (25)", num_rolls: 2
	};
	assert.deepEqual(tswrollsorter.format_rolls(data), expected);
});

QUnit.module( "tswrollsorter.format" );
QUnit.test("1 roll", function(assert) {
	var data = [
		{ people: ["Person1"], roll: "28"}
	];
	var expected = "1 Rolls: Person1 (28)";
	assert.deepEqual(tswrollsorter.format(data), expected);
});

QUnit.test("2 rolls", function(assert) {
	var data = [
		{ people: ["Person1"], roll: "28" },
		{ people: ["Person2"], roll: "25" }
	];
	var expected = "2 Rolls: Person1 (28) -- Person2 (25)";
	assert.deepEqual(tswrollsorter.format(data), expected);
});

QUnit.module( "tswrollsorter.process" );
QUnit.test("No text", function(assert) {
	var data = "";
	var expected = "";

	assert.deepEqual(tswrollsorter.process(data), expected);
});

QUnit.test("Valid rolls", function(assert) {
	var data = '[04:36] Person rolled a 3.' +
		'[04:36] Person rolled a 82.' +
		'[04:36] Person rolled a 100.';
	var expected = "1 Rolls: Person (3)";

	assert.deepEqual(tswrollsorter.process(data), expected);
});