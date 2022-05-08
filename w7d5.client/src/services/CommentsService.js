import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService
{
    async getByEvent(eventId)
    {
        const res = await api.get("api/events/" + eventId + "/comments");
        logger.log("CommentsService.vue > getByEvent response", res.data);
        AppState.comments = res.data;
    }

    clearActive()
    {
        AppState.comments = [];
    }
}

export const commentsService = new CommentsService();