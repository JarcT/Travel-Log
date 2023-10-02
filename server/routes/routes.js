const express = require('express')
const { getAllLogs, createLog, updateLog, deleteLog } = require('../controllers/locationLogController')
const router = express.Router()

router.route('/travelLogs').get(getAllLogs).post(createLog)
router.route('/travelLogs/:id').patch(updateLog).delete(deleteLog)

module.exports = router