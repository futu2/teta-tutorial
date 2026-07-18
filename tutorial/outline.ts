export type TutorialOutline = {
  title: string;
  dialect: "postgresql";
  sections: Array<{
    id: string;
    title: string;
    intro?: string;
    examples: Array<{
      id: string;
      title: string;
      file: string;
    }>;
  }>;
};

const tutorial: TutorialOutline = {
  title: "Teta SQL EDSL Tutorial",
  dialect: "postgresql",
  sections: [
    {
      id: "select-basics",
      title: "0 SELECT basics",
      intro: "Start with SELECT, FROM, and basic column projection.",
      examples: [
        {
          id: "q01-modify-it-to-show-the-population",
          title: "Modify it to show the population of Germany",
          file: "tutorial/examples/select-basics/01-modify-it-to-show-the-population.ts",
        },
        {
          id: "q02-show-the-name-and-the-population",
          title:
            "Show the name and the population for 'Sweden', 'Norway' and 'Denmark'.",
          file: "tutorial/examples/select-basics/02-show-the-name-and-the-population.ts",
        },
        {
          id: "q03-which-countries-are-not-too-small",
          title: "Which countries are not too small and not too big?",
          file: "tutorial/examples/select-basics/03-which-countries-are-not-too-small.ts",
        },
      ],
    },
    {
      id: "select-name",
      title: "1 SELECT name",
      intro: "Filtering, sorting, and string matching.",
      examples: [
        {
          id: "q01-find-the-country-that-start-with",
          title: "Find the country that start with Y",
          file: "tutorial/examples/select-name/01-find-the-country-that-start-with.ts",
        },
        {
          id: "q02-find-the-countries-that-end-with",
          title: "Find the countries that end with y",
          file: "tutorial/examples/select-name/02-find-the-countries-that-end-with.ts",
        },
        {
          id: "q03-find-the-countries-that-contain-the",
          title: "Find the countries that contain the letter x",
          file: "tutorial/examples/select-name/03-find-the-countries-that-contain-the.ts",
        },
        {
          id: "q04-find-the-countries-that-end-with",
          title: "Find the countries that end with land",
          file: "tutorial/examples/select-name/04-find-the-countries-that-end-with.ts",
        },
        {
          id: "q05-find-the-countries-that-start-with",
          title: "Find the countries that start with C and end with ia",
          file: "tutorial/examples/select-name/05-find-the-countries-that-start-with.ts",
        },
        {
          id: "q06-find-the-country-that-has-oo",
          title: "Find the country that has oo in the name",
          file: "tutorial/examples/select-name/06-find-the-country-that-has-oo.ts",
        },
        {
          id: "q07-find-the-countries-that-have-three",
          title: "Find the countries that have three or more a in the name",
          file: "tutorial/examples/select-name/07-find-the-countries-that-have-three.ts",
        },
        {
          id: "q08-find-the-countries-that-have-t",
          title: 'Find the countries that have "t" as the second character.',
          file: "tutorial/examples/select-name/08-find-the-countries-that-have-t.ts",
        },
        {
          id: "q09-find-the-countries-that-have-two",
          title:
            'Find the countries that have two "o" characters separated by two others.',
          file: "tutorial/examples/select-name/09-find-the-countries-that-have-two.ts",
        },
        {
          id: "q10-find-the-countries-that-have-exactly",
          title: "Find the countries that have exactly four characters.",
          file: "tutorial/examples/select-name/10-find-the-countries-that-have-exactly.ts",
        },
        {
          id: "q11-find-the-country-where-the-name",
          title: "Find the country where the name is the capital city.",
          file: "tutorial/examples/select-name/11-find-the-country-where-the-name.ts",
        },
        {
          id: "q12-find-the-country-where-the-capital",
          title:
            'Find the country where the capital is the country plus "City".',
          file: "tutorial/examples/select-name/12-find-the-country-where-the-capital.ts",
        },
        {
          id: "q13-find-the-capital-and-the-name",
          title:
            "Find the capital and the name where the capital includes the name of the country.",
          file: "tutorial/examples/select-name/13-find-the-capital-and-the-name.ts",
        },
        {
          id: "q14-find-the-capital-and-the-name",
          title:
            "Find the capital and the name where the capital is an extension of name of the country.",
          file: "tutorial/examples/select-name/14-find-the-capital-and-the-name.ts",
        },
        {
          id: "q15-show-the-name-and-the-extension",
          title:
            "Show the name and the extension where the capital is a proper (non-empty) extension of name of the country.",
          file: "tutorial/examples/select-name/15-show-the-name-and-the-extension.ts",
        },
      ],
    },
    {
      id: "select-world",
      title: "2 SELECT from WORLD",
      intro: "Working with country data and numeric filters.",
      examples: [
        {
          id: "q01-read-the-notes-about-this-table",
          title:
            "Read the notes about this table. Observe the result of running this SQL command to show the name, continent and population of all countries.",
          file: "tutorial/examples/select-world/01-read-the-notes-about-this-table.ts",
        },
        {
          id: "q02-how-to-use-where-to-filter",
          title: "How to use WHERE to filter records.",
          file: "tutorial/examples/select-world/02-how-to-use-where-to-filter.ts",
        },
        {
          id: "q03-give-the-name-and-the-per",
          title:
            "Give the name and the per capita GDP for those countries with a population of at least 200 million.",
          file: "tutorial/examples/select-world/03-give-the-name-and-the-per.ts",
        },
        {
          id: "q04-show-the-name-and-population-in",
          title:
            "Show the name and population in millions for the countries of the continent 'South America'.",
          file: "tutorial/examples/select-world/04-show-the-name-and-population-in.ts",
        },
        {
          id: "q05-show-the-name-and-population-for",
          title: "Show the name and population for France, Germany, Italy",
          file: "tutorial/examples/select-world/05-show-the-name-and-population-for.ts",
        },
        {
          id: "q06-show-the-countries-which-have-a",
          title:
            "Show the countries which have a name that includes the word 'United'",
          file: "tutorial/examples/select-world/06-show-the-countries-which-have-a.ts",
        },
        {
          id: "q07-show-the-countries-that-are-big",
          title:
            "Show the countries that are big by area or big by population. Show name, population and area.",
          file: "tutorial/examples/select-world/07-show-the-countries-that-are-big.ts",
        },
        {
          id: "q08-exclusive-or-xor-show-the-countries",
          title:
            "Exclusive OR (XOR). Show the countries that are big by area (more than 3 million) or big by population (more than 250 million) but not both. Show name, population and area.",
          file: "tutorial/examples/select-world/08-exclusive-or-xor-show-the-countries.ts",
        },
        {
          id: "q09-for-americas-show-population-in-millions",
          title:
            "For Americas show population in millions and GDP in billions both to 2 decimal places.",
          file: "tutorial/examples/select-world/09-for-americas-show-population-in-millions.ts",
        },
        {
          id: "q10-show-per-capita-gdp-for-the",
          title:
            "Show per-capita GDP for the trillion dollar countries to the nearest $1000.",
          file: "tutorial/examples/select-world/10-show-per-capita-gdp-for-the.ts",
        },
        {
          id: "q11-show-the-name-and-capital-where",
          title:
            "Show the name and capital where the name and the capital have the same number of characters.",
          file: "tutorial/examples/select-world/11-show-the-name-and-capital-where.ts",
        },
        {
          id: "q12-show-the-name-and-the-capital",
          title:
            "Show the name and the capital where the first letters of each match.",
          file: "tutorial/examples/select-world/12-show-the-name-and-the-capital.ts",
        },
        {
          id: "q13-find-the-country-that-has-all",
          title:
            "Find the country that has all the vowels and no spaces in its name.",
          file: "tutorial/examples/select-world/13-find-the-country-that-has-all.ts",
        },
      ],
    },
    {
      id: "select-nobel",
      title: "3 SELECT from NOBEL",
      intro: "Practice selecting rows from a prize dataset.",
      examples: [
        {
          id: "q01-change-the-query-shown-so-that",
          title:
            "Change the query shown so that it displays Nobel prizes for 1950.",
          file: "tutorial/examples/select-nobel/01-change-the-query-shown-so-that.ts",
        },
        {
          id: "q02-show-who-won-the-1962-prize",
          title: "Show who won the 1962 prize for literature.",
          file: "tutorial/examples/select-nobel/02-show-who-won-the-1962-prize.ts",
        },
        {
          id: "q03-show-the-year-and-subject-that",
          title:
            "Show the year and subject that won 'Albert Einstein' his prize.",
          file: "tutorial/examples/select-nobel/03-show-the-year-and-subject-that.ts",
        },
        {
          id: "q04-give-the-name-of-the-peace",
          title:
            "Give the name of the 'peace' winners since the year 2000, including 2000.",
          file: "tutorial/examples/select-nobel/04-give-the-name-of-the-peace.ts",
        },
        {
          id: "q05-show-all-details-yr-subject-winner",
          title:
            "Show all details (yr, subject, winner) of the literature prize winners for 1980 to 1989 inclusive.",
          file: "tutorial/examples/select-nobel/05-show-all-details-yr-subject-winner.ts",
        },
        {
          id: "q06-show-all-details-of-the-presidential",
          title: "Show all details of the presidential winners:",
          file: "tutorial/examples/select-nobel/06-show-all-details-of-the-presidential.ts",
        },
        {
          id: "q07-show-the-winners-with-first-name",
          title: "Show the winners with first name John",
          file: "tutorial/examples/select-nobel/07-show-the-winners-with-first-name.ts",
        },
        {
          id: "q08-show-the-year-subject-and-name",
          title:
            "Show the year, subject, and name of physics winners for 1980 together with the chemistry winners for 1984.",
          file: "tutorial/examples/select-nobel/08-show-the-year-subject-and-name.ts",
        },
        {
          id: "q09-show-the-year-subject-and-name",
          title:
            "Show the year, subject, and name of winners for 1980 excluding chemistry and medicine",
          file: "tutorial/examples/select-nobel/09-show-the-year-subject-and-name.ts",
        },
        {
          id: "q10-show-year-subject-and-name-of",
          title:
            "Show year, subject, and name of people who won a 'Medicine' prize in an early year (before 1910, not including 1910) together with winners of a 'Literature' prize in a later year (after 2004, including 2004)",
          file: "tutorial/examples/select-nobel/10-show-year-subject-and-name-of.ts",
        },
        {
          id: "q11-find-all-details-of-the-prize",
          title: "Find all details of the prize won by PETER GRÜNBERG",
          file: "tutorial/examples/select-nobel/11-find-all-details-of-the-prize.ts",
        },
        {
          id: "q12-find-all-details-of-the-prize",
          title: "Find all details of the prize won by EUGENE O'NEILL",
          file: "tutorial/examples/select-nobel/12-find-all-details-of-the-prize.ts",
        },
        {
          id: "q13-list-the-winners-year-and-subject",
          title:
            "List the winners, year and subject where the winner starts with Sir. Show the the most recent first, then by name order.",
          file: "tutorial/examples/select-nobel/13-list-the-winners-year-and-subject.ts",
        },
        {
          id: "q14-show-the-1984-winners-and-subject",
          title:
            "Show the 1984 winners and subject ordered by subject and winner name; but list chemistry and physics last.",
          file: "tutorial/examples/select-nobel/14-show-the-1984-winners-and-subject.ts",
        },
      ],
    },
    {
      id: "select-within-select",
      title: "4 SELECT within SELECT",
      intro: "Subqueries and nested filters.",
      examples: [
        {
          id: "q01-list-each-country-name-where-the",
          title:
            "List each country name where the population is larger than that of 'Russia'.",
          file: "tutorial/examples/select-within-select/01-list-each-country-name-where-the.ts",
        },
        {
          id: "q02-show-the-countries-in-europe-with",
          title:
            "Show the countries in Europe with a per capita GDP greater than 'United Kingdom'.",
          file: "tutorial/examples/select-within-select/02-show-the-countries-in-europe-with.ts",
        },
        {
          id: "q03-list-the-name-and-continent-of",
          title:
            "List the name and continent of countries in the continents containing either Argentina or Australia. Order by name of the country.",
          file: "tutorial/examples/select-within-select/03-list-the-name-and-continent-of.ts",
        },
        {
          id: "q04-which-country-has-a-population-that",
          title:
            "Which country has a population that is more than United Kingdom but less than Germany? Show the name and the population.",
          file: "tutorial/examples/select-within-select/04-which-country-has-a-population-that.ts",
        },
        {
          id: "q05-show-the-name-and-the-population",
          title:
            "Show the name and the population of each country in Europe. Show the population as a percentage of the population of Germany.",
          file: "tutorial/examples/select-within-select/05-show-the-name-and-the-population.ts",
        },
        {
          id: "q06-which-countries-have-a-gdp-greater",
          title:
            "Which countries have a GDP greater than every country in Europe? [Give the name only.] (Some countries may have NULL gdp values)",
          file: "tutorial/examples/select-within-select/06-which-countries-have-a-gdp-greater.ts",
        },
        {
          id: "q07-find-the-largest-country-by-area",
          title:
            "Find the largest country (by area) in each continent, show the continent, the name and the area:",
          file: "tutorial/examples/select-within-select/07-find-the-largest-country-by-area.ts",
        },
        {
          id: "q08-list-each-continent-and-the-name",
          title:
            "List each continent and the name of the country that comes first alphabetically.",
          file: "tutorial/examples/select-within-select/08-list-each-continent-and-the-name.ts",
        },
        {
          id: "q09-find-the-continents-where-all-countries",
          title: "Find the continents where all countries have a population",
          file: "tutorial/examples/select-within-select/09-find-the-continents-where-all-countries.ts",
        },
        {
          id: "q10-some-countries-have-populations-more-than",
          title:
            "Some countries have populations more than three times that of all of their neighbours (in the same continent). Give the countries and continents.",
          file: "tutorial/examples/select-within-select/10-some-countries-have-populations-more-than.ts",
        },
      ],
    },
    {
      id: "sum-count",
      title: "5 SUM and COUNT",
      intro: "Aggregate functions and grouping.",
      examples: [
        {
          id: "q01-show-the-total-population-of-the",
          title: "Show the total population of the world.",
          file: "tutorial/examples/sum-count/01-show-the-total-population-of-the.ts",
        },
        {
          id: "q02-list-all-the-continents-just-once",
          title: "List all the continents - just once each.",
          file: "tutorial/examples/sum-count/02-list-all-the-continents-just-once.ts",
        },
        {
          id: "q03-give-the-total-gdp-of-africa",
          title: "Give the total GDP of Africa",
          file: "tutorial/examples/sum-count/03-give-the-total-gdp-of-africa.ts",
        },
        {
          id: "q04-how-many-countries-have-an-area",
          title: "How many countries have an area of at least 1000000",
          file: "tutorial/examples/sum-count/04-how-many-countries-have-an-area.ts",
        },
        {
          id: "q05-what-is-the-total-population-of",
          title:
            "What is the total population of ('Estonia', 'Latvia', 'Lithuania')",
          file: "tutorial/examples/sum-count/05-what-is-the-total-population-of.ts",
        },
        {
          id: "q06-for-each-continent-show-the-continent",
          title:
            "For each continent show the continent and number of countries.",
          file: "tutorial/examples/sum-count/06-for-each-continent-show-the-continent.ts",
        },
        {
          id: "q07-for-each-continent-show-the-continent",
          title:
            "For each continent show the continent and number of countries with populations of at least 10 million.",
          file: "tutorial/examples/sum-count/07-for-each-continent-show-the-continent.ts",
        },
        {
          id: "q08-list-the-continents-that-have-a",
          title:
            "List the continents that have a total population of at least 100 million.",
          file: "tutorial/examples/sum-count/08-list-the-continents-that-have-a.ts",
        },
      ],
    },
    {
      id: "join",
      title: "6 JOIN",
      intro: "Joining tables with foreign keys.",
      examples: [
        {
          id: "q01-modify-it-to-show-the-matchid",
          title:
            "Modify it to show the matchid and player name for all goals scored by Germany. To identify German players, check for:",
          file: "tutorial/examples/join/01-modify-it-to-show-the-matchid.ts",
        },
        {
          id: "q02-show-id-stadium-team1-team2-for",
          title: "Show id, stadium, team1, team2 for just game 1012",
          file: "tutorial/examples/join/02-show-id-stadium-team1-team2-for.ts",
        },
        {
          id: "q03-modify-it-to-show-the-player",
          title:
            "Modify it to show the player, teamid, stadium and mdate for every German goal.",
          file: "tutorial/examples/join/03-modify-it-to-show-the-player.ts",
        },
        {
          id: "q04-show-the-team1-team2-and-player",
          title:
            "Show the team1, team2 and player for every goal scored by a player called Mario player LIKE 'Mario%'",
          file: "tutorial/examples/join/04-show-the-team1-team2-and-player.ts",
        },
        {
          id: "q05-show-player-teamid-coach-gtime-for",
          title:
            "Show player, teamid, coach, gtime for all goals scored in the first 10 minutes gtime<=10",
          file: "tutorial/examples/join/05-show-player-teamid-coach-gtime-for.ts",
        },
        {
          id: "q06-list-the-dates-of-the-matches",
          title:
            "List the dates of the matches and the name of the team in which 'Fernando Santos' was the team1 coach.",
          file: "tutorial/examples/join/06-list-the-dates-of-the-matches.ts",
        },
        {
          id: "q07-list-the-player-for-every-goal",
          title:
            "List the player for every goal scored in a game where the stadium was 'National Stadium, Warsaw'",
          file: "tutorial/examples/join/07-list-the-player-for-every-goal.ts",
        },
        {
          id: "q08-instead-show-the-name-of-all",
          title:
            "Instead show the name of all players who scored a goal against Germany.",
          file: "tutorial/examples/join/08-instead-show-the-name-of-all.ts",
        },
        {
          id: "q09-show-teamname-and-the-total-number",
          title: "Show teamname and the total number of goals scored.",
          file: "tutorial/examples/join/09-show-teamname-and-the-total-number.ts",
        },
        {
          id: "q10-show-the-stadium-and-the-number",
          title:
            "Show the stadium and the number of goals scored in each stadium.",
          file: "tutorial/examples/join/10-show-the-stadium-and-the-number.ts",
        },
        {
          id: "q11-for-every-match-involving-pol-show",
          title:
            "For every match involving 'POL', show the matchid, date and the number of goals scored.",
          file: "tutorial/examples/join/11-for-every-match-involving-pol-show.ts",
        },
        {
          id: "q12-for-every-match-where-ger-scored",
          title:
            "For every match where 'GER' scored, show matchid, match date and the number of goals scored by 'GER'",
          file: "tutorial/examples/join/12-for-every-match-where-ger-scored.ts",
        },
        {
          id: "q13-list-every-match-with-the-goals",
          title:
            'List every match with the goals scored by each team as shown. This will use "CASE WHEN" which has not been explained in any previous exercises.',
          file: "tutorial/examples/join/13-list-every-match-with-the-goals.ts",
        },
      ],
    },
    {
      id: "more-join",
      title: "7 More JOIN",
      intro: "Multi-table joins and aliases.",
      examples: [
        {
          id: "q01-list-the-films-where-the-yr",
          title:
            "List the films where the yr is 1962 and the budget is over 2000000 [Show id, title]",
          file: "tutorial/examples/more-join/01-list-the-films-where-the-yr.ts",
        },
        {
          id: "q02-give-year-of-citizen-kane",
          title: "Give year of 'Citizen Kane'.",
          file: "tutorial/examples/more-join/02-give-year-of-citizen-kane.ts",
        },
        {
          id: "q03-list-all-of-the-star-trek",
          title:
            "List all of the Star Trek movies, include the id, title and yr (all of these movies start with the words Star Trek in the title). Order results by year.",
          file: "tutorial/examples/more-join/03-list-all-of-the-star-trek.ts",
        },
        {
          id: "q04-what-id-number-does-the-actor",
          title: "What id number does the actor 'Glenn Close' have?",
          file: "tutorial/examples/more-join/04-what-id-number-does-the-actor.ts",
        },
        {
          id: "q05-what-is-the-id-of-the",
          title: "What is the id of the 1942 film 'Casablanca'",
          file: "tutorial/examples/more-join/05-what-is-the-id-of-the.ts",
        },
        {
          id: "q06-obtain-the-cast-list-for-1942",
          title: "Obtain the cast list for 1942's 'Casablanca'.",
          file: "tutorial/examples/more-join/06-obtain-the-cast-list-for-1942.ts",
        },
        {
          id: "q07-obtain-the-cast-list-for-the",
          title: "Obtain the cast list for the film 'Alien'",
          file: "tutorial/examples/more-join/07-obtain-the-cast-list-for-the.ts",
        },
        {
          id: "q08-list-the-films-in-which-harrison",
          title: "List the films in which 'Harrison Ford' has appeared",
          file: "tutorial/examples/more-join/08-list-the-films-in-which-harrison.ts",
        },
        {
          id: "q09-list-the-films-where-harrison-ford",
          title:
            "List the films where 'Harrison Ford' has appeared - but not in the starring role.",
          file: "tutorial/examples/more-join/09-list-the-films-where-harrison-ford.ts",
        },
        {
          id: "q10-list-the-films-together-with-the",
          title:
            "List the films together with the leading star for all 1962 films.",
          file: "tutorial/examples/more-join/10-list-the-films-together-with-the.ts",
        },
        {
          id: "q11-which-were-the-busiest-years-for",
          title:
            "Which were the busiest years for 'Rock Hudson', show the year and the number of movies he made each year for any year in which he made more than 2 movies.",
          file: "tutorial/examples/more-join/11-which-were-the-busiest-years-for.ts",
        },
        {
          id: "q12-list-the-film-title-and-the",
          title:
            "List the film title and the leading actor for all of the films 'Julie Andrews' played in.",
          file: "tutorial/examples/more-join/12-list-the-film-title-and-the.ts",
        },
        {
          id: "q13-obtain-a-list-in-alphabetical-order",
          title:
            "Obtain a list, in alphabetical order, of actors who've had at least 15 starring roles.",
          file: "tutorial/examples/more-join/13-obtain-a-list-in-alphabetical-order.ts",
        },
        {
          id: "q14-list-the-films-released-in-the",
          title:
            "List the films released in the year 1978 ordered by the number of actors in the cast, then by title.",
          file: "tutorial/examples/more-join/14-list-the-films-released-in-the.ts",
        },
        {
          id: "q15-list-all-the-people-who-have",
          title: "List all the people who have worked with 'Art Garfunkel'.",
          file: "tutorial/examples/more-join/15-list-all-the-people-who-have.ts",
        },
      ],
    },
    {
      id: "using-null",
      title: "8 Using NULL",
      intro: "Null checks and outer joins.",
      examples: [
        {
          id: "q01-list-the-teachers-who-have-null",
          title: "List the teachers who have NULL for their department.",
          file: "tutorial/examples/using-null/01-list-the-teachers-who-have-null.ts",
        },
        {
          id: "q02-note-the-inner-join-misses-the",
          title:
            "Note the INNER JOIN misses the teachers with no department and the departments with no teacher.",
          file: "tutorial/examples/using-null/02-note-the-inner-join-misses-the.ts",
        },
        {
          id: "q03-use-a-different-join-so-that",
          title: "Use a different JOIN so that all teachers are listed.",
          file: "tutorial/examples/using-null/03-use-a-different-join-so-that.ts",
        },
        {
          id: "q04-use-a-different-join-so-that",
          title: "Use a different JOIN so that all departments are listed.",
          file: "tutorial/examples/using-null/04-use-a-different-join-so-that.ts",
        },
        {
          id: "q05-use-coalesce-to-print-the-mobile",
          title:
            "Use COALESCE to print the mobile number. Use the number '07986 444 2266' if there is no number given.",
          file: "tutorial/examples/using-null/05-use-coalesce-to-print-the-mobile.ts",
        },
        {
          id: "q06-use-the-coalesce-function-and-a",
          title:
            "Use the COALESCE function and a LEFT JOIN to print the teacher name and department name.",
          file: "tutorial/examples/using-null/06-use-the-coalesce-function-and-a.ts",
        },
        {
          id: "q07-use-count-to-show-the-number",
          title:
            "Use COUNT to show the number of teachers and the number of mobile phones.",
          file: "tutorial/examples/using-null/07-use-count-to-show-the-number.ts",
        },
        {
          id: "q08-use-count-and-group-by-dept",
          title:
            "Use COUNT and GROUP BY dept.name to show each department and the number of staff.",
          file: "tutorial/examples/using-null/08-use-count-and-group-by-dept.ts",
        },
        {
          id: "q09-use-case-to-show-the-name",
          title:
            "Use CASE to show the name of each teacher followed by 'Sci' if the teacher is in dept 1 or 2 and 'Art' otherwise.",
          file: "tutorial/examples/using-null/09-use-case-to-show-the-name.ts",
        },
        {
          id: "q10-use-case-to-show-the-name",
          title:
            "Use CASE to show the name of each teacher followed by 'Sci' if the teacher is in dept 1 or 2, show 'Art' if the teacher's dept is 3 and 'None' otherwise.",
          file: "tutorial/examples/using-null/10-use-case-to-show-the-name.ts",
        },
      ],
    },
    {
      id: "self-join",
      title: "9 Self JOIN",
      intro: "Self-referencing joins and comparisons.",
      examples: [
        {
          id: "q01-how-many-stops-are-in-the",
          title: "How many stops are in the database.",
          file: "tutorial/examples/self-join/01-how-many-stops-are-in-the.ts",
        },
        {
          id: "q02-find-the-id-value-for-the",
          title: "Find the id value for the stop 'Craiglockhart'",
          file: "tutorial/examples/self-join/02-find-the-id-value-for-the.ts",
        },
        {
          id: "q03-give-the-id-and-the-name",
          title:
            "Give the id and the name for the stops on the '4' 'LRT' service.",
          file: "tutorial/examples/self-join/03-give-the-id-and-the-name.ts",
        },
        {
          id: "q04-the-query-shown-gives-the-number",
          title:
            "The query shown gives the number of routes that visit either London Road (149) or Craiglockhart (53). Run the query and notice the two services that link these stops have a count of 2.",
          file: "tutorial/examples/self-join/04-the-query-shown-gives-the-number.ts",
        },
        {
          id: "q05-execute-the-self-join-shown-and",
          title:
            "Execute the self join shown and observe that b.stop gives all the places you can get to from Craiglockhart, without changing routes.",
          file: "tutorial/examples/self-join/05-execute-the-self-join-shown-and.ts",
        },
        {
          id: "q06-the-query-shown-is-similar-to",
          title:
            "The query shown is similar to the previous one, however by joining two copies of the stops table we can refer to stops by name rather than by number.",
          file: "tutorial/examples/self-join/06-the-query-shown-is-similar-to.ts",
        },
        {
          id: "q07-give-a-list-of-all-the",
          title:
            "Give a list of all the services which connect stops 115 and 137 ('Haymarket' and 'Leith')",
          file: "tutorial/examples/self-join/07-give-a-list-of-all-the.ts",
        },
        {
          id: "q08-give-a-list-of-the-services",
          title:
            "Give a list of the services which connect the stops 'Craiglockhart' and 'Tollcross'",
          file: "tutorial/examples/self-join/08-give-a-list-of-the-services.ts",
        },
        {
          id: "q09-give-a-distinct-list-of-the",
          title:
            "Give a distinct list of the stops which may be reached from 'Craiglockhart' by taking one bus, including 'Craiglockhart' itself, offered by the LRT company. Include the company and bus no. of the relevant services.",
          file: "tutorial/examples/self-join/09-give-a-distinct-list-of-the.ts",
        },
        {
          id: "q10-find-the-routes-involving-two-buses",
          title:
            "Find the routes involving two buses that can go from Craiglockhart to Lochend.",
          file: "tutorial/examples/self-join/10-find-the-routes-involving-two-buses.ts",
        },
      ],
    },
  ],
};

export default tutorial;
