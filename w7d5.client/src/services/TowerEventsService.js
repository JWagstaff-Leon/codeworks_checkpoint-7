import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class TowerEventsService
{
    async getAll()
    {
        const res = await api.get("api/events");
        AppState.towerEvents = res.data;
    }
}

export const towerEventsService = new TowerEventsService();