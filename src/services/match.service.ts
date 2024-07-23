import MatchModel from "@models/match.model"

const getById = async (id: number) => {
    const response = await MatchModel.find({matchId: id})
    return response
}

const getLatestByMatchTypeLimit = async (matchType: "league" | "playoff", limit: number) => {
    const response = await MatchModel.find({matchType: matchType}).sort({timestamp: -1}).limit(limit)
    return response
}

const getLatestLimit = async (limit: number) => {
    const response = await MatchModel.find({}).sort({timestamp: -1}).limit(limit)
    return response
}

const getAll = async () => {
    const response = await MatchModel.find({})
    return response
}

export { getById, getLatestByMatchTypeLimit, getLatestLimit, getAll}