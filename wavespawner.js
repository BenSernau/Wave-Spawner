var enemyKey = 0; //We use two prompts to discern the key and the value before asserting the key/value pair, so we need to reference both of them.
var enemyVal = 0;
var enemyIndex = 0; //We retrieve this from the user.  While it's above a certain threshold, we prompt the user for key/value pairs.
var waveIndex = 0; //For referencing where we are in the following array.  We're actually going to reuse it b/c we're going to iterate through the same array twice.
var waveVals = []; //Array of maximum point values for each wave.
var enemyMap = new Map();
var keyIndex = 0; //When the user has finished the map, this is for deciding which key/value pair the program's gonna choose for the wave.
var lowestKey = "";

const readline = require('readline');
const rl = readline.createInterface({ //Set up the i/o interface for the user
	input: process.stdin,
	output: process.stdout,
	prompt: 'Wavespawner> '
});

console.log("\nHow many enemy types do you want?\n")
rl.prompt();

rl.on('line', (line) => {

	if (Number(enemyIndex) == 0)
	{
		if (!isNaN(line))
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

	else if (Number(enemyIndex) % 2 === 0 && Number(enemyIndex) > 3) //If it's even get one input.  If it's odd, get the other.
	{
		enemyKey = line;
		enemyIndex--;

		if (!isNaN(line))
		{
			console.log("\nSuper. You're the one who gets to read it.")
		}

		console.log("\nWhat's this enemy's value, in points?\n");
		rl.prompt();
	}

	else if (Number(enemyIndex) > 3)
	{
		if (!isNaN(line))
		{
			enemyVal = Number(line);

			enemyMap.set(enemyKey, enemyVal); //We can offer the pair now that we have both inputs.

			if (lowestKey == "" || Number(enemyVal) < Number(enemyMap.get(lowestKey))) //Keep the lowest key up to date.  It'll be important later.
			{
				lowestKey = enemyKey;
			}

			enemyIndex--;

			console.log("\nWhat's the next enemy's name?\n")
		}

		else
		{
			console.log("\nTry again, wise guy.\n\nWhat's this enemy's value, in points?\n");
		}
		
		rl.prompt();
	}

	else if (Number(enemyIndex) == 3)
	{
		//Get the last value for the last key, and then start doing something different.

		if (!isNaN(line))
		{
			enemyVal = Number(line);

			enemyMap.set(enemyKey, enemyVal); //We can offer the pair now that we have both inputs.

			if (lowestKey == "" || Number(enemyVal) < Number(enemyMap.get(lowestKey))) //Keep the lowest key up to date.  It'll be important later.
			{
				lowestKey = enemyKey;
			}

			enemyIndex--;

			console.log("\nAlright, that's it for enemies.  How many waves do you want?\n");
		}

		else
		{
			console.log("\nTry again, wise guy.\n");
		}
		
		rl.prompt();
	}

	else if (Number(waveVals.length) == 0) //Once the user decides how many waves there are, this if won't catch again.
	{
		if (!isNaN(line))
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

	else if (Number(waveIndex) < Number(waveVals.length - 1))
	{
		if (!isNaN(line))
		{
			waveVals[waveIndex] = Number(line);
			waveIndex++;
			console.log("\nOf how many points should the next wave consist?\n");
		}

		else
		{
			console.log("\nTry again, wise guy.\n\nOf how many points should the next wave consist?\n")
		}

		rl.prompt();
	}

	else if (!isNaN(line))
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

	while (Number(waveIndex) < Number(waveVals.length))
	{
		console.log("\nWAVE " + (Number(waveIndex) + 1).toString() + ":\n");

		while (waveVals[waveIndex] > 0) //While there are still points...
		{
			keyIndex = Math.floor(Math.random() * enemyMap.size); //Pick a target index to stop at when we iterate through the map.

			for (var key of enemyMap.keys()) 
			{
				if (Number(keyIndex) > 0)
				{
					keyIndex--; //Skip the current key and wait until the next one.  We move onto the else if when we get to the target index.
				}

				else if (Number(waveVals[Number(waveIndex)]) - Number(enemyMap.get(key)) >= 0) //Make sure the enemy fits in terms of points.
				{
					console.log(key + " (worth " + enemyMap.get(key) + " point(s))");
					waveVals[waveIndex] -= Number(enemyMap.get(key)); //Keep track of the points.
					break; //Go pick another one.
				}

				else //If it doesn't, just pick the weakest one you can find and put it in.
				{
					console.log(lowestKey + " (worth " + enemyMap.get(lowestKey) + " point(s))");
					waveVals[waveIndex] -= Number(enemyMap.get(lowestKey));
					break;
				}
			}
		}

		if (Number(waveVals[waveIndex]) < 0) //Show the overflow (if it's there)
		{
			console.log("\n(Point value exceeded by " + Math.abs(waveVals[waveIndex]) + ")")
		}

		waveIndex++;
	}

	//Explain some of the math.

	console.log("\nNB: Because we want waves to be random, we won't reevaluate\ncombinations if they don't fit perfectly into the point\nvalue.  We'll just add the weakest enemy to the end\nof the wave.  If one of your enemies is worth 1\npoint, then you'll never have a problem.\n");

	process.exit(0);
});



