var enemyMap = new Map();
var totalValue = 20;
var keyIndex = 0;
var waveVals = [10, 20, 30, 35, 35];
var currentWave = 0;

enemyMap.set("goblin", 1);
enemyMap.set("warg", 1);
enemyMap.set("drow", 1);
enemyMap.set("dark dwarf", 3);
enemyMap.set("warlock", 3);
enemyMap.set("necromancer", 3);
enemyMap.set("black knight", 6);
enemyMap.set("griffin", 6);
enemyMap.set("chimera", 6);
enemyMap.set("manticore", 6);
enemyMap.set("basilisk", 9);
enemyMap.set("wyvern", 9);
enemyMap.set("dragon", 9);
enemyMap.set("demigod", 11);

while (currentWave < waveVals.length)
{
	totalValue = waveVals[currentWave];
	currentWave++;
	
	console.log("\nWAVE " + currentWave.toString() + ":\n");

	while (totalValue > 0)
	{
		keyIndex = Math.floor(Math.random() * enemyMap.size);

		for (var key of enemyMap.keys()) 
		{
			if (keyIndex > 0)
			{
				keyIndex--;
			}

			else if (enemyMap.get(key) <= totalValue)
			{
				console.log(key);
				totalValue -= enemyMap.get(key);
				break;
			}

			else
			{
				break;
			}
		}

	}
}

