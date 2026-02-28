import { TPlatformType } from '../../ProClubsAPI';
import { getClubStats, getClubInfo } from '../../ProClubsAPI';
import ClubModel from '../models/club.model';

const CACHE_TTL_MS = Number(process.env.CLUB_CACHE_MS || 60 * 60 * 1000);

// MAPPING más directo en vez de DTO
const mapClubInfo = (rawInfo: any) => {
    return {
        name: rawInfo?.name || '',
        regionId: Number(rawInfo?.regionId) || 0,
        clubId: Number(rawInfo?.clubId) || 0
    };
};

const mapClubStats = (rawStats: any) => {
    const statsStats = Array.isArray(rawStats) ? rawStats[0] : rawStats;

    return {
        bestDivision: Number(statsStats?.bestDivision) || 0,
        bestFinishGroup: Number(statsStats?.bestFinishGroup) || 0,
        gamesPlayed: Number(statsStats?.gamesPlayed) || 0,
        gamesPlayedPlayoff: Number(statsStats?.gamesPlayedPlayoff) || 0,
        goals: Number(statsStats?.goals) || 0,
        goalsAgainst: Number(statsStats?.goalsAgainst) || 0,
        promotions: Number(statsStats?.promotions) || 0,
        relegations: Number(statsStats?.relegations) || 0,
        wins: Number(statsStats?.wins) || 0,
        ties: Number(statsStats?.ties) || 0,
        losses: Number(statsStats?.losses) || 0,
        winstreak: Number(statsStats?.wstreak) || 0,
        unbeatenstreak: Number(statsStats?.unbeatenstreak) || 0,
        skill: Number(statsStats?.skillRating) || 0,
        reputationtier: Number(statsStats?.reputationtier) || 0
    };
};

export const getClubDataCache = async (platform: TPlatformType, clubId: number) => {
    try {
        let cache = await ClubModel.findOne({ clubId });

        // Check cache
        const isExpired = cache ? (Date.now() - (cache as any).updatedAt.getTime() > CACHE_TTL_MS) : true;

        if (!cache || isExpired) {
            console.log(`Cache ${cache ? 'EXPIRED' : 'MISS'} for ClubData. Fetching from API...`);


            const [rawInfo, rawStats] = await Promise.all([
                getClubInfo(platform, clubId),
                getClubStats(platform, clubId)
            ]);

            const infoToSave = rawInfo ? mapClubInfo(rawInfo) : {};
            const statsToSave = rawStats ? mapClubStats(rawStats) : {};

            const updateData = {
                ...infoToSave,
                stats: statsToSave
            };


            cache = await ClubModel.findOneAndUpdate(
                { clubId },
                { $set: updateData },
                { upsert: true, new: true }
            );
        } else {
            console.log("Cache HIT for ClubData.");
        }

        /**Codigo algo raruno de la IA xd */
        if (cache) {
            const { _id, __v, createdAt, ...cleanDoc } = cache.toObject() as any;
            return cleanDoc;
        }

        return undefined;

    } catch (error) {
        console.error("Error in getClubDataCache:", error);

        // Fallback en caso de error de la API: devolver la caché (incluso caducada si existe)
        const fallbackCache = await ClubModel.findOne({ clubId });
        if (fallbackCache) {
            console.log("Returning EXPIRED cache data as fallback.");
            /**Codigo algo raruno de la IA xd */
            const { _id, __v, createdAt, ...cleanDoc } = fallbackCache.toObject() as any;
            return cleanDoc;
        }
        return undefined;
    }
};
