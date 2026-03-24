let cloneVal = 0; //Use an integer to keep track of clones if the user has accidentally or impertinently included duplicates.
let enemyName = ""; //We use two prompts to discern the key and the value before asserting the key/value pair, so we need to reference both of them.
let enemyVal = 0;
let enemyIndex = 0; //We retrieve this from the user.  While it's above a certain threshold, we prompt the user for key/value pairs.
let keyIndex = 0; //When the user has finished the map, this is for deciding which key/value pair the program's gonna choose for the wave.
let newEnemy = undefined;
let waveIndex = 0; //For referencing where we are in the following array.  We're actually going to reuse it b/c we're going to iterate through the same array twice.
let weakestEnemy = undefined;

const enemyList = [];
const enemyNames = new Set();
const waveVals = []; //Array of maximum point values for each wave.

const readline = require('readline');
const rl = readline.createInterface({ //Set up the i/o interface for the user
	input: process.stdin,
	output: process.stdout,
	prompt: 'Wavespawner> '
});

console.log("\nHow many enemy types do you want?\n")
rl.prompt();

rl.on('line', (line) => {

	if (enemyIndex == 0)
	{
		if (Number.isInteger(Number(line)) && Number(line) > 0)
		{
			enemyIndex = 2 * Number(line); //Two inputs per enemy: name and point value...
			enemyIndex += 2; //We don't want this if to catch, again.  We continue to different inputs regarding waves when we reach 3.
			console.log("\nWhat's the first enemy's name?\n");
		}

		else
		{
			console.log("\nThanks, genius.\n\nHow many enemy types do you want (HINT: You don't need to spell the number)?\n")
		}

		rl.prompt();
	}

	else if (enemyIndex % 2 === 0 && enemyIndex > 3) //If it's even get one input.  If it's odd, get the other.
	{
		enemyName = line;
		enemyIndex--;

		if (Number.isInteger(Number(line)) && Number(line) > 0 || line == "")
		{
			console.log("\nSuper. You're the one who gets to read it.")
		}

		console.log("\nWhat's this enemy's value, in points?\n");
		rl.prompt();
	}

	else if (enemyIndex >= 3)
	{
		if (Number.isInteger(Number(line)) && Number(line) > 0)
		{
			enemyVal = Number(line);

			if (enemyNames.has(enemyName))
			{
				newEnemy = {name: enemyName + " (clone " + ++cloneVal + ")", value: enemyVal};
				enemyList.push(newEnemy);
			}
			
			else
			{
				newEnemy = {name: enemyName, value: enemyVal};
				enemyList.push(newEnemy); //We can offer the pair now that we have both inputs.
				enemyNames.add(enemyName)
			}

			if (!weakestEnemy || enemyVal < weakestEnemy.value) //Keep the lowest key up to date.  It'll be important later.
			{
				weakestEnemy = newEnemy;
			}
			

			if (enemyIndex == 3)
			{
				console.log("\nAlright, that's it for enemies.  How many waves do you want?\n");
			}

			else
			{
				console.log("\nWhat's the next enemy's name?\n");
			}

			enemyIndex--;
		}

		else
		{
			console.log("\nTry again, wise guy.\n");
		}
		
		rl.prompt();
	}

	else if (waveVals.length == 0) //Once the user decides how many waves there are, this if won't catch again.
	{
		if (Number.isInteger(Number(line)) && Number(line) > 0)
		{
			waveVals.length = Number(line);
			console.log("\nOf how many points should the first wave consist?\n");
		}

		else
		{
			console.log("\nTry again, wise guy.\n\nHow many waves do you want?\n")
		}

		rl.prompt();
	}

	else if (waveIndex < waveVals.length - 1)
	{
		if (Number.isInteger(Number(line)) && Number(line) > 0)
		{
			waveVals[waveIndex] = Number(line);
			waveIndex++;
			console.log("\nOf how many points should the next wave consist?\n");
		}

		else
		{
			console.log("\nTry again, wise guy.\n\nOf how many points should the wave consist?\n")
		}

		rl.prompt();
	}

	else if (Number.isInteger(Number(line)) && Number(line) > 0)
	{
		console.log("\nOkay, here's the lineup...");
		waveVals[waveIndex] = Number(line);
		rl.close(); //Nothing in this statement catches again.
	}

	else
	{
		console.log("\nTry again, wise guy.\n\nOf how many points should the next wave consist?\n")
		rl.prompt();
	}

}).on('close', () => {

	waveIndex = 0;

	while (waveIndex < waveVals.length)
	{
		console.log("\nWAVE " + (waveIndex + 1).toString() + ":\n");

		while (waveVals[waveIndex] > 0) //While there are still points...
		{
			keyIndex = Math.floor(Math.random() * enemyList.length); //Pick a target index to stop at when we iterate through the map.
			//console.log(waveVals[waveIndex]);
			if (waveVals[waveIndex] - enemyList[keyIndex].value >= 0) //Make sure the enemy fits in terms of points.
			{
				console.log(enemyList[keyIndex].name + " (worth " + enemyList[keyIndex].value + " point(s))");
				waveVals[waveIndex] -= enemyList[keyIndex].value; //Keep track of the points.
			}

			else //If it doesn't, just pick the weakest one you can find and put it in.
			{
				console.log(weakestEnemy.name + " (worth " + weakestEnemy.value + " point(s))");
				waveVals[waveIndex] -= weakestEnemy.value;
			}


		}

		if (waveVals[waveIndex] < 0) //Show the overflow (if it's there)
		{
			console.log("\n(Point value exceeded by " + Math.abs(waveVals[waveIndex]) + ")")
		}

		waveIndex++;
	}

	//Explain some of the math.

	console.log("\nNB: Because we want waves to be random, we won't reevaluate\ncombinations if they don't fit perfectly into the point\nvalue.  We'll just add the weakest enemy to the end\nof the wave.  If one of your enemies is worth 1\npoint, then you'll never have a problem.\n");

	rl.close();
	process.exit(0);
});