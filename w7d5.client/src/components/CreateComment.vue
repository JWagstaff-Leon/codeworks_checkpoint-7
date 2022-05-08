<template>
    <form @submit.prevent="postComment">
        <div class="d-flex flex-column align-items-end">
            <span class="text-success mb-2">Join the conversation</span>
                <label class="visually-hidden">New comment</label>
                <textarea class="w-100 form-control" placeholder="Tell the people" v-model="newComment" required></textarea>
                <button class="mt-2 btn btn-success text-dark" type="submit">post comment</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { commentsService } from '../services/CommentsService.js';
import { useRoute } from 'vue-router';
export default
{
    setup()
    {
        const route = useRoute();
        const newComment = ref("");
        return {
            newComment,
            async postComment()
            {
                try
                {
                    await commentsService.postComment({body: newComment.value, eventId: route.params.id});
                    Pop.toast("Comment posted!", "success");
                }
                catch(error)
                {
                    logger.error("[CreateComment.vue > postComment]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
textarea
{
    height: 5rem;
    resize: none;
}
</style>