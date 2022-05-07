import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketsService
{
    async getByEvent(eventId)
    {
        AppState.attendees = [];
        const res = await api.get("api/events/" + eventId + "/tickets");
        logger.log("TicketsService > getByEvent response", res.data)
        AppState.attendees = res.data.map(ticket => ticket.account);
    }
}

export const ticketsService = new TicketsService();