
export async function allShowTransport(url: string, lastUpdated?: Date) {

    const u = url;

    if (lastUpdated && lastUpdated >= allShowsDataModifiedDate) {
        return null;
    }

    if (url.endsWith("txt")) {
        return {
            body: allShowsData,
            lastModifiedDate: allShowsDataModifiedDate
        }
    }

    if (url.endsWith("92")) {
        return {
            body: episodeDataText,
        }
    }

    return {
        body: noDataText
    }
}

const allShowsData =
    `title,directory,tvrage,TVmaze,start date,end date,number of episodes,run time,network,country
"A for Andromeda",AforAndromeda,764,,Oct 1961,Nov 1961,"7 eps","45 min","BBC",UK
"The A List",AList,,37579,Oct 2018,___ ____,"13 eps","30 min","BBC iPlayer",UK
"A to Z",AtoZ,37968,92,Sep 2014,Jan 2015,"13 eps","30 min","NBC",US
`;

export const allShowParsedDate =
{
    showList:
        [{
            title: 'A for Andromeda',
            directory: 'AforAndromeda',
            tvrage: 764,
            startDate: new Date("1961-10-01T08:00:00.000Z"),
            endDate: new Date("1961-11-01T08:00:00.000Z"),
            numberOfEpisodes: 7,
            runTime: 45,
            network: 'BBC',
            country: 'UK'
        },
        {
            title: 'The A List',
            directory: 'AList',
            tvmaze: 37579,
            startDate: new Date("2018-10-01T07:00:00.000Z"),
            numberOfEpisodes: 13,
            runTime: 30,
            network: 'BBC iPlayer',
            country: 'UK'
        },
        {
            title: 'A to Z',
            directory: 'AtoZ',
            tvrage: 37968,
            tvmaze: 92,
            startDate: new Date("2014-09-01T07:00:00.000Z"),
            endDate: new Date("2015-01-01T08:00:00.000Z"),
            numberOfEpisodes: 13,
            runTime: 30,
            network: 'NBC',
            country: 'US'
        }]
};


const allShowsDataModifiedDate = new Date(1972, 1, 1, 0, 0, 0, 0);


const episodeDataText =
    `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">


	<head>
		<title>list output</title>
	</head>



	<body>
		<pre>
number,season,episode,airdate,title,tvmaze link
1,1,1,02 Oct 14,"A is for Acquaintances","http://www.tvmaze.com/episodes/5962/a-to-z-1x01-a-is-for-acquaintances"
2,1,2,09 Oct 14,"B is for Big Glory","http://www.tvmaze.com/episodes/5963/a-to-z-1x02-b-is-for-big-glory"
3,1,3,16 Oct 14,"C is for Curiouser &amp; Curiouser","http://www.tvmaze.com/episodes/5964/a-to-z-1x03-c-is-for-curiouser-curiouser"
4,1,4,23 Oct 14,"D is for Debbie","http://www.tvmaze.com/episodes/5965/a-to-z-1x04-d-is-for-debbie"
5,1,5,30 Oct 14,"E is for Ectoplasm","http://www.tvmaze.com/episodes/5966/a-to-z-1x05-e-is-for-ectoplasm"
6,1,6,06 Nov 14,"F is for Fight, Fight, Fight!","http://www.tvmaze.com/episodes/5967/a-to-z-1x06-f-is-for-fight-fight-fight"
7,1,7,13 Nov 14,"G is for Geronimo","http://www.tvmaze.com/episodes/31865/a-to-z-1x07-g-is-for-geronimo"
8,1,8,20 Nov 14,"H is for Hostile Takeover","http://www.tvmaze.com/episodes/5968/a-to-z-1x08-h-is-for-hostile-takeover"
9,1,9,11 Dec 14,"I is for Ill Communication","http://www.tvmaze.com/episodes/46301/a-to-z-1x09-i-is-for-ill-communication"
10,1,10,01 Jan 15,"J is for Jan Vaughan","http://www.tvmaze.com/episodes/61033/a-to-z-1x10-j-is-for-jan-vaughan"
11,1,11,08 Jan 15,"K is for Keep Out","http://www.tvmaze.com/episodes/96521/a-to-z-1x11-k-is-for-keep-out"
12,1,12,15 Jan 15,"L is for Likeability","http://www.tvmaze.com/episodes/107037/a-to-z-1x12-l-is-for-likeability"
13,1,13,22 Jan 15,"M is for Meant to Be","http://www.tvmaze.com/episodes/117558/a-to-z-1x13-m-is-for-meant-to-be"

		</pre>
	</body>
</html>`

export const episodeData = { episodes:
    [ { number: 1,
        season: 1,
        episode: 1,
        airDate: new Date("2014-10-02T07:00:00.000Z"),
        title: 'A is for Acquaintances',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5962/a-to-z-1x01-a-is-for-acquaintances' },
      { number: 2,
        season: 1,
        episode: 2,
        airDate: new Date("2014-10-09T07:00:00.000Z"),
        title: 'B is for Big Glory',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5963/a-to-z-1x02-b-is-for-big-glory' },
      { number: 3,
        season: 1,
        episode: 3,
        airDate: new Date("2014-10-16T07:00:00.000Z"),
        title: 'C is for Curiouser &amp; Curiouser',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5964/a-to-z-1x03-c-is-for-curiouser-curiouser' },
      { number: 4,
        season: 1,
        episode: 4,
        airDate: new Date("2014-10-23T07:00:00.000Z"),
        title: 'D is for Debbie',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5965/a-to-z-1x04-d-is-for-debbie' },
      { number: 5,
        season: 1,
        episode: 5,
        airDate: new Date("2014-10-30T07:00:00.000Z"),
        title: 'E is for Ectoplasm',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5966/a-to-z-1x05-e-is-for-ectoplasm' },
      { number: 6,
        season: 1,
        episode: 6,
        airDate: new Date("2014-11-06T08:00:00.000Z"),
        title: 'F is for Fight, Fight, Fight!',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5967/a-to-z-1x06-f-is-for-fight-fight-fight' },
      { number: 7,
        season: 1,
        episode: 7,
        airDate: new Date("2014-11-13T08:00:00.000Z"),
        title: 'G is for Geronimo',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/31865/a-to-z-1x07-g-is-for-geronimo' },
      { number: 8,
        season: 1,
        episode: 8,
        airDate: new Date("2014-11-20T08:00:00.000Z"),
        title: 'H is for Hostile Takeover',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/5968/a-to-z-1x08-h-is-for-hostile-takeover' },
      { number: 9,
        season: 1,
        episode: 9,
        airDate: new Date("2014-12-11T08:00:00.000Z"),
        title: 'I is for Ill Communication',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/46301/a-to-z-1x09-i-is-for-ill-communication' },
      { number: 10,
        season: 1,
        episode: 10,
        airDate: new Date("2015-01-01T08:00:00.000Z"),
        title: 'J is for Jan Vaughan',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/61033/a-to-z-1x10-j-is-for-jan-vaughan' },
      { number: 11,
        season: 1,
        episode: 11,
        airDate: new Date("2015-01-08T08:00:00.000Z"),
        title: 'K is for Keep Out',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/96521/a-to-z-1x11-k-is-for-keep-out' },
      { number: 12,
        season: 1,
        episode: 12,
        airDate: new Date("2015-01-15T08:00:00.000Z"),
        title: 'L is for Likeability',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/107037/a-to-z-1x12-l-is-for-likeability' },
      { number: 13,
        season: 1,
        episode: 13,
        airDate: new Date("2015-01-22T08:00:00.000Z"),
        title: 'M is for Meant to Be',
        tvmazeUri:
         'http://www.tvmaze.com/episodes/117558/a-to-z-1x13-m-is-for-meant-to-be' } ] };


const noDataText = 
`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">


	<head>
		<title>list output</title>
	</head>



	<body>
		<pre>
no data
		</pre>
	</body>
</html>
`;