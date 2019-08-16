const express = require('express')
const Kayn = require('../kayn.config')
const router = express.Router()

router.get('/:championId', (req, res, next) => {
  const championId = req.params.championId;
  let championInfo = {};

  const getChampionInfo = async () => {
    const championList = await Kayn.DDragon.Champion.list()
    Object.keys(championList.data).forEach((key, index) => {

      if (championList.data[key].key === championId) {
        championInfo = {
          name: championList.data[key].name,
          image: championList.data[key].image,
        }
      }

    })

    res.status(200).json({
      championInfo
    })
  }

  getChampionInfo()

})

module.exports = router