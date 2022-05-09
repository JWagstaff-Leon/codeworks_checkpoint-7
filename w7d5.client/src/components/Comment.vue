<template>
    <div class="d-flex py-3">
        <img :src="comment.creator.picture" :alt="'profile picture of ' + comment.creator.name" class="rounded-circle me-2 shadow" />
        <div class="d-flex flex-column bg-dark lighten-70 p-2 rounded-2 shadow flex-grow-1 position-relative">
            <span class="text-black">{{comment.creator.name}} <i v-if="comment.isAttending" class="text-warning mdi mdi-human-handsup fs-5" :title="comment.creator.name + ' is attending'"></i></span>
            <div class="flex-grow-1">
                <p>{{comment.body}}</p>
            </div>
            <i v-if="comment.creator.id === accountId" class="text-danger mdi mdi-delete selectable delete-button" title="delete your comment" @click="deleteComment" role="button"></i>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { commentsService } from '../services/CommentsService.js'
export default
{
    props:
    {
        comment:
        {
            type: Object,
            require: true
        }
    },

    setup(props)
    {
        return {
            accountId: computed(() => AppState.account.id),
            async deleteComment()
            {
                try
                {
                    if(await Pop.confirm())
                    {
                        await commentsService.remove(props.comment.id);
                        Pop.toast("Comment deleted", "success");
                    }
                }
                catch(error)
                {
                    logger.error("[Comment.vue > deleteComment]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
img
{
    height: 5rem;
    width: 5rem;
}

.delete-button
{
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 1.25rem;
}
</style>