import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class TicketsService
{
    async getByEvent(eventId)
    {
        const res = await api.get("api/events/" + eventId + "/tickets");
        AppState.attendees = res.data.map(ticket => ticket.account);
    }
}

export const ticketsService = new TicketsService();