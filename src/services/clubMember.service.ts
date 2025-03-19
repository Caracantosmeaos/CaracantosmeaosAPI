import ClubMemberModel from "@models/clubMember.model"

const getByName = async (playername: string) => {
    const response = await ClubMemberModel.find({playerName: playername},{_id:0})
    return response
}


const getAll = async () => {
    const response = await ClubMemberModel.find({},{_id:0})
    return response
}

export { getByName, getAll}