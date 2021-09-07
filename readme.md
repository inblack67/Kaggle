### Assignment 1

- Taking this dataset from Kaggle - https://www.kaggle.com/unitednations/international-greenhouse-gas-emissions

- You have to clean this dataset as per the needs mentioned below and store it in any database of your choice (you can use SQLite (file based) as data won't change for this assignment)

- You have to build the following APIs :

- **/countries** - get all countries in the dataset (names, ids and their possible values for startYear and endYear)
- **/country/id?queries=explained-below**
  - temporal queries - startYear | endYear
  - parameters queries - one or parameters (e.g, CO2 or CO2 and NO2)
  - should return all values for the selected parameters between startYear and endYear
- Add appropriate checks for queries and erroneous values

- Bonus Features:
- Add caching
- Submit the live and Github link for the task along with some screenshots.

- The live link should host an OpenAPI spec file listing all the APIs (you can use Heroku or any other normal server)

- Also, write a brief answer for the following:

- What was the most challenging part?
- What was the most fun part?
- What do you think is wrong with this task or could be made better in this task?
