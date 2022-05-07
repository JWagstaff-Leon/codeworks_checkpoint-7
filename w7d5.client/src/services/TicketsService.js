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
        logger.log("TicketsService > ")
        AppState.attendees.unshift(res.data.account);
        AppState.userTickets.push(res.data)
    }

    async unattendEvent(id)
    {
        const res = await api.delete("api/tickets/" + id);

        const attendeeIndex = AppState.attendees.findIndex(attendee => attendee.id === res.data.accountId);
        AppState.attendees.splice(attendeeIndex, 1);

        const userIndex = AppState.userTickets.findIndex(ticket => ticket.eventId === res.data.eventId);
        AppState.userTickets.splice(userIndex, 1);
    }

    async getUserTickets()
    {
        this.clearUserActive();
        const res = await api.get("account/tickets");
        logger.log("TicketsService > getUserTickets response", res.data)
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