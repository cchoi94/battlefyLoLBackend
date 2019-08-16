const express = require('express')
const Kayn = require('../kayn.config')
const router = express.Router()

router.get('/:summonerName', (req, res, next) => {
  const summonerName = req.params.summonerName
  Kayn.Summoner.by.name(summonerName)
    .then(summoner => {
      Kayn.Matchlist.by.accountID(summoner.accountId).then(matchList => {
        let summonerMatchList = []
        const getParticipantList = async () => {
          for (const [index, match] of matchList.matches.entries()) {
            if (index === 5) {
              break;
            } else {
              const matchInfo = await Kayn.Match.get(match.gameId)
              matchInfo.participantIdentities.forEach(identity => {
                if (identity.player.accountId == summoner.accountId) {
                  matchInfo.participants.forEach(participant => {
                    if (participant.participantId === identity.participantId) {
                      summonerMatchList.push({
                        summonerInfo: participant,
                        gameDuration: matchInfo.gameDuration,
                        teams: matchInfo.teams,
                        allParticipants: matchInfo.participants
                      })
                    }
                  })
                }
              })
            }
          }
          res.status(200).json({
            numberOfMatches: summonerMatchList.length,
            summonerMatchList,
          })
        }
        getParticipantList()
      })
    }).catch(error => {
      res.status(404).json({
        error,
        message: `Summoner named ${summonerName} was not found`
      })
    })
})

module.exports = router