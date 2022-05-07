import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TicketsService
{
    async getByEvent(eventId)
    {
        
        const res = await api.get("api/events/" + eventId + "/tickets");
        logger.log("TicketsService > getByEvent response", res.data)
        AppState.attendees = res.data.map(ticket => ticket.account);
    }

    async attendEvent(eventId)
    {
        const res = await api.post("api/tickets", { eventId });
        AppState.attendees.unshift(res.data.account);
        this.getUserTickets();
    }

    async getUserTickets()
    {
        this.clearUserActive();
        const res = await api.get("account/tickets");
        AppState.userTickets = res.data;
    }

    clearActive()
    {
        AppState.attendees = [];
    }

    clearUserActive()
    {
        AppState.userTickets = [];
    }
}

export const ticketsService = new TicketsService();