
export async function allShowTransport(url: string, lastUpdated?: Date) {

    const u = url;

    if (lastUpdated && lastUpdated >= allShowsDataModifiedDate) {
        return null;
    }

    return {
        body: allShowsData,
        lastModifiedDate: allShowsDataModifiedDate
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
