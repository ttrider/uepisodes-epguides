# uEpisodes-epguides
[![Build Status](https://travis-ci.org/ttrider/uepisodes-epguides.svg?branch=master)](https://travis-ci.org/ttrider/uepisodes-epguides)

Returns information about TV shows from the http://epguides.com website

# Installation

```
$ npm install uepisodes-epguides
```
# Usage

## get the list of shows
```typescript

import epguides from "uepisodes-epguides";

const c = epguides();

const shows = await c.getShows();

for (let index = 0; index < shows.showList.length; index++) {

    const showInfo = shows.showList[index];

    console.log(showInfo);
}
```
Output:
```
{ title: 'A for Andromeda',
  directory: 'AforAndromeda',
  tvrage: 764,
  startDate: 1961-10-01T08:00:00.000Z,
  endDate: 1961-11-01T08:00:00.000Z,
  numberOfEpisodes: 7,
  runTime: 45,
  network: 'BBC',
  country: 'UK' }

{ title: 'The A List',
  directory: 'AList',
  tvmaze: 37579,
  startDate: 2018-10-01T07:00:00.000Z,
  numberOfEpisodes: 13,
  runTime: 30,
  network: 'BBC iPlayer',
  country: 'UK' }
{
...
...
...

```

## get a show episodes by name
```typescript

import epguides from "uepisodes-epguides";

const c = epguides();

const c = client();

const show = await c.getShowEpisodes("Absentia");

if (show !== null) {
    for (let index = 0; index < show.episodes.length; index++) {
        const episode = show.episodes[index];

        console.log(episode);
    }
}

```
Output:
```
{ number: 1,
  season: 1,
  episode: 1,
  airDate: 2017-09-25T07:00:00.000Z,
  title: 'Comeback',
  tvmazeUri:
   'https://www.tvmaze.com/episodes/1315751/absentia-1x01-comeback' }

{ number: 2,
  season: 1,
  episode: 2,
  airDate: 2017-09-25T07:00:00.000Z,
  title: 'Reset',
  tvmazeUri:
   'https://www.tvmaze.com/episodes/1315752/absentia-1x02-reset' }
{ number: 3,
  season: 1,
  episode: 3,
  airDate: 2017-10-02T07:00:00.000Z,
  title: 'The Emily Show',
  tvmazeUri:
   'https://www.tvmaze.com/episodes/1315753/absentia-1x03-the-emily-show' }
...
...
...
```

# License
MIT 

