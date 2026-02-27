// Defines the structure of our internal MongoDB caching object for a Club
export interface IClub {
    clubId: number;
    regionId: number;
    name: string;
    stats: {
        bestDivision: number;
        bestFinishGroup: number;
        gamesPlayed: number;
        gamesPlayedPlayoff: number;
        goals: number;
        goalsAgainst: number;
        promotions: number;
        relegations: number;
        wins: number;
        ties: number;
        losses: number;
        winstreak: number;
        unbeatenstreak: number;
        skill: number;
        reputationtier: number;
    };
    updatedAt?: Date;
}
