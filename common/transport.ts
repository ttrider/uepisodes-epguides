
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
"The A Word",AWord,51488,11402,Mar 2016,___ ____,"12+ eps","60 min","BBC1",UK
"Aaagh! It's the Mr. Hell Show!",AaaghItstheMrHellShow,1726,,Oct 2001,Feb 2002,"13 eps","30 min","BBC2",UK
"Aaahh!!! Real Monsters",AaahhRealMonsters,2470,,Oct 1994,Dec 1997,"52 eps","30 min","Nick",US
"Aaron Stone",AaronStone,20135,7449,Feb 2009,Jul 2010,"35 eps","30 min","Disney XD",US
"Aaron's Way",AaronsWay,2471,,Mar 1988,May 1988,"14 eps","60 min","NBC",US
"The Abbott and Costello Show",AbbottandCostelloShow,5517,14572,Dec 1952,May 1954,"52 eps","30 min","syndicated",US
"Abby",Abby,2472,,Jan 2003,Mar 2005,"9 eps","30 min","UPN",US
"Abby's",Abbys,,34546,Mar 2019,June 2019,"10 eps","30 min","NBC",US
"Abby's Ultimate Dance Competition",AbbysUltimateDanceCompetition,32847,9420,Oct 2012,Nov 2013,"22 eps","60 min","Lifetime",US
`;

const allShowsDataModifiedDate = new Date(1972, 1, 1, 0, 0, 0, 0);
