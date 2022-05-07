import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _formatDate(p_date)
{
    const oldDate = new Date(p_date);
    let newDate = "";

    newDate += oldDate.getDate();
    if(+newDate >= 4 && +newDate <= 20 )
    {
        newDate += "th";
    }
    else
    {
        switch(newDate[newDate.length - 1])
        {
        case "0":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            newDate += "th";
            break;
        case "1":
            newDate += "st";
            break;
        case "2":
            newDate += "nd";
            break;
        case "3":
            newDate += "rd";
            break;
        }
    }

    newDate += " of ";

    switch(oldDate.getMonth())
    {
        case 0:
            newDate += "January";
            break;
        case 1:
            newDate += "February";
            break;
        case 2:
            newDate += "March";
            break;
        case 3:
            newDate += "April";
            break;
        case 4:
            newDate += "May";
            break;
        case 5:
            newDate += "June";
            break;
        case 6:
            newDate += "July";
            break;
        case 7:
            newDate += "August";
            break;
        case 8:
            newDate += "September";
            break;
        case 9:
            newDate += "October";
            break;
        case 10:
            newDate += "November";
            break;
        case 11:
            newDate += "December";
            break;
    }

    return newDate;
}

function _formatTime(p_date)
{
    const oldTime = new Date(p_date);
    let newTime = "";

    if(oldTime.getHours() < 10)
    {
        newTime += "0";
    }
    newTime += oldTime.getHours();
    newTime += ":";
    if(oldTime.getMinutes() < 10)
    {
        newTime += "0";
    }
    newTime += oldTime.getMinutes();
    
    return newTime;
}

class TowerEventsService
{
    async getAll()
    {
        // this.clearAll();
        const res = await api.get("api/events");
        res.data.forEach(v => v.startTime = _formatTime(v.startDate));
        res.data.forEach(v => v.startDate = _formatDate(v.startDate));
        logger.log("TowerEventsService > getAll response", res.data);
        AppState.towerEvents = res.data;
    }

    
    async getById(id)
    {
        // debugger;
        // this.clearActive();
        const res = await api.get("api/events/" + id);
        res.data.startTime = _formatTime(res.data.startDate);
        res.data.startDate = _formatDate(res.data.startDate);
        logger.log("TowerEventsService > getById response", res.data);
        AppState.activeTowerEvent = res.data;
    }
    
    clearActive()
    {
        AppState.activeTowerEvent = null;
    }

    clearAll()
    {
        AppState.towerEvents = [];
    }
}

export const towerEventsService = new TowerEventsService();