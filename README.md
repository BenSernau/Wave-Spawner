## Overview

A popular mechanic in many single-player games, an “arena” often describes a limited space in which to dispatch waves of enemies. This application receives as input enemy names and their respective point values to simulate the production of enemy waves, thereby aiding in arena design.

## Problem Definition

To engage players effectively, arenas need to deliver progressively more difficult enemy waves without feeling outright unfair at any point. To this end, not only does the program receive enemy names and corresponding point values, but it also requires the user to establish specific point maxima for every wave.

Avoiding full automation, the application seeks only to suggest what enemy waves would look like hypothetically. For example, consider an especially tough 6-point enemy in a 15-point wave. If the enemy appears in the wave twice, the user may decide that the scenario is too difficult and increase the value of the enemy accordingly.

Game development is a creative endeavor, and human beings should have the final say in how their arenas work. Still, this tool simulates an arena’s waves of enemies to help developers create a balanced experience that aligns the player’s arsenal with reasonable challenges.

## Input Format

This application receives input from the user via the terminal. The user responds directly to each prompt with a string or integer, providing information in the following order: the number of enemy types, the name-value pairs for each enemy type, the number of waves, and the maximum number of points for each wave.

Note that the program does not require users to give high point values to difficult enemies or to increase maximum point values as waves progress. Potentially unhelpful, such input is not necessarily erroneous, though the program does not neglect to handle errors appropriately.

## Error Handling

As flexible as input can be in terms of value, type must remain consistent. Accordingly, prompts for positive integers reject all other inputs, while prompts for strings warn against the inclusion of numbers in enemy names. Prompts that receive errors repeat until the user provides input of the correct type. Finally, the program avoids duplicate enemies by assigning an incremental value to the current clone.

## Implementation

The algorithm takes a random greedy approach to wave generation, including enemies in waves by subtracting enemies’ point values from a wave’s point maximum until that wave has no more available points. This behavior repeats for as many waves as the user requests. Furthermore, if a random enemy’s value exceeds a wave’s maximum, the algorithm falls back to the enemy with the lowest value, completing the wave with a copy of the weakest enemy instead of a random enemy.

### Structures

The program begins by establishing a dialogue with the user and initializing structures to store the user’s data. Most fundamentally, these structures are the array for each enemy’s name-value combination and the array of point maxima. Variables store more intermediate information, including a reference to the “weakest” enemy with the lowest value as well as both a set of enemy names and reference to the current enemy in order to determine the weakest enemy. 

### Enemy Input

Now, the program requests the number of enemies from the user, prompting the user to provide every enemy’s name and value in points. Prompts alternate between names and values until the user has defined all enemies. Names may be numbers or empty strings, though the program advises against such assignments.

Whenever the user creates an enemy, the program adds the enemy’s name to the set of names. If the user duplicates an enemy, the program adds the clone counter to the end of the duplicate’s name and increments the clone counter. Also, if the program has not identified the weakest enemy or if the latest enemy’s value is less than the weakest enemy’s value, the new enemy becomes the weakest enemy.

### Wave Input

After receiving the roster of enemies, the program requests the number of waves from the user, prompting the user to provide the point maximum for each wave. No generation begins until the user provides appropriate input for all necessary values. If the user fails to provide appropriate input at any point, a prompt simply repeats.

### Wave Generation

The program announces its advancement to the generation phase in the terminal. For each wave, the program begins to iterate through the point maximum, generating random enemies as long as those enemies’ values fit within the maximum. If an enemy’s value is too high to fit into a wave’s remaining points, the program appends the weakest enemy to the wave and indicates by how many points the total value of enemies exceeds the wave’s maximum. Note that the program never exceeds a wave’s maximum if at least 1 enemy has a point value of 1. Finally, the program announces the termination of the generation process and exits the code.

## Constraints and Assumptions

Overall, this program assumes users will include values that make sense. For instance, an enemy’s point value should not exceed a wave’s maximum value. While such a discrepancy is not an error, it will result in unhelpful output.

This program also assumes that selecting random enemies within a numerical threshold is preferable in certain contexts. Users may want to be more intentional about how they implement wave-based combat in arenas. A user may want to be sure that there are at least two instances of a certain enemy in a wave, for example.

## Example Terminal Dialogue

<i>

How many enemy types do you want?

Wavespawner> 5

What's the first enemy's name?

Wavespawner> Goomba

What's this enemy's value, in points?

Wavespawner> 1

What's the next enemy's name?

Wavespawner> Drowner

What's this enemy's value, in points?

Wavespawner> 3

What's the next enemy's name?

Wavespawner> Vampire

What's this enemy's value, in points?

Wavespawner> 5

What's the next enemy's name?

Wavespawner> Engineering Professor

What's this enemy's value, in points?

Wavespawner> 9

What's the next enemy's name?

Wavespawner> In-Law

What's this enemy's value, in points?

Wavespawner> 15

Alright, that's it for enemies.  How many waves do you want?

Wavespawner> 4

Of how many points should the first wave consist?

Wavespawner> 30

Of how many points should the next wave consist?

Wavespawner> 60

Of how many points should the next wave consist?

Wavespawner> 90

Of how many points should the next wave consist?

Wavespawner> 120

Okay, here's the lineup...

WAVE 1:

Drowner (worth 3 point(s))

In-Law (worth 15 point(s))

Engineering Professor (worth 9 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

WAVE 2:

Vampire (worth 5 point(s))

In-Law (worth 15 point(s))

Engineering Professor (worth 9 point(s))

Vampire (worth 5 point(s))

In-Law (worth 15 point(s))

Drowner (worth 3 point(s))

Drowner (worth 3 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

WAVE 3:

Goomba (worth 1 point(s))

Drowner (worth 3 point(s))

In-Law (worth 15 point(s))

Drowner (worth 3 point(s))

In-Law (worth 15 point(s))

Engineering Professor (worth 9 point(s))

Vampire (worth 5 point(s))

Drowner (worth 3 point(s))

Vampire (worth 5 point(s))

Vampire (worth 5 point(s))

Vampire (worth 5 point(s))

Engineering Professor (worth 9 point(s))

Engineering Professor (worth 9 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

WAVE 4:

Drowner (worth 3 point(s))

Engineering Professor (worth 9 point(s))

Goomba (worth 1 point(s))

Drowner (worth 3 point(s))

Engineering Professor (worth 9 point(s))

Goomba (worth 1 point(s))

Engineering Professor (worth 9 point(s))

In-Law (worth 15 point(s))

Drowner (worth 3 point(s))

In-Law (worth 15 point(s))

Vampire (worth 5 point(s))

Drowner (worth 3 point(s))

Drowner (worth 3 point(s))

In-Law (worth 15 point(s))

Vampire (worth 5 point(s))

Goomba (worth 1 point(s))

Engineering Professor (worth 9 point(s))

Engineering Professor (worth 9 point(s))

Goomba (worth 1 point(s))

Goomba (worth 1 point(s))

NB: Because we want waves to be random, we won't reevaluate
combinations if they don't fit perfectly into the point
value.  We'll just add the weakest enemy to the end
of the wave.  If one of your enemies is worth 1
point, then you'll never have a problem.

</i>

## Limitations

The program does not shield the user from all inputs. The user is ultimately responsible for providing values conducive to the inclusion of enemies in waves.

As for efficiency, let E be the number of enemy types, W be the number of waves, P be the point value in each wave, and M be the minimum enemy value. In terms of time complexity, enemy creation runs in O(E) time, since each insertion is constant and seeking a set’s element is also constant. Wave creation runs in O(W) time, unimpeded by any kind of extra iteration. Wave generation runs in O(P / M) time, since P must subtract M after each iteration in worst cases. Thus, the final time complexity is O(E + W + (P / M)) and space complexity is O(E + W) because the point value for each wave has no impact on how many waves there are.

## Future Improvements

A more robust program would allow for the creation of multiple arenas. Multiple arenas would allow for users to consider different sets of enemies. Some enemies could be in all arenas, and some enemies could be exclusive to one or two.
