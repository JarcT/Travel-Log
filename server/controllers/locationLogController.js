const { Error } = require('mongoose')
const Log = require('../models/TraveLogSchema')


const getAllLogs = async  (req, res, next) => {
    try {
        const logs = await Log.find({})
        if(!logs){
            throw new Error('No existing logs')
        }
        res.status(200).json({logs})
    } catch (error) {
        next(error)
    }
}

const createLog = async (req, res, next) => {
    try {
        console.log(req.body);
        const log = await Log.create(req.body)
        res.status(200).json({log})
    } catch (error) {
        next(error)
    }
}

const updateLog =  async (req, res, next) => {
    try {
        const {title, dateVisited, latitude, longitude} = req.body
        if(!title || !dateVisited || !latitude|| !longitude){
            throw new Error('parameters missing')
        }
        const {id: logId} = req.params
        const log = await Log.findOneAndUpdate({logId}, req.body, {new: true})
        res.status(200).json({log})
    } catch (error) {
        next(error)
    }

}
const deleteLog =  async (req, res, next) => {
    try {
        const log = await Log.findOneAndDelete((req.params.id))
        if(!log){
            throw new Error("a log with the given id does not exist")
        }
        res.status(200).json({log})

    } catch (error) {
        next(error)
    }
}

module.exports = {getAllLogs, createLog, updateLog, deleteLog}