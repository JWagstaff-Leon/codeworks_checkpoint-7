<template>
    <form @submit.prevent="postComment">
        <div class="d-flex flex-column align-items-end my-4">
            <span class="text-success mb-2">Join the conversation</span>
                <label class="visually-hidden">New comment</label>
                <textarea class="w-100 form-control" placeholder="Tell the people" @keypress.enter="submitForm" v-model.trim="newComment" required></textarea>
                <div v-if="posting" class="spinner-border text-success mt-2"></div>
                <button v-else class="mt-2 btn btn-success text-dark" type="submit">post comment</button>
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
        const posting = ref(false);

        const postComment = async () =>
            {
                try
                {
                    posting.value = true;
                    await commentsService.postComment({body: newComment.value, eventId: route.params.id});
                    posting.value = false;
                    Pop.toast("Comment posted!", "success");
                    newComment.value = "";
                }
                catch(error)
                {
                    posting.value = false
                    logger.error("[CreateComment.vue > postComment]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        return {
            newComment,
            posting,
            submitForm()
            {
                logger.log("sus")
                if(newComment.value.length > 0 && !posting.value)
                {
                    postComment();
                }
            },
            postComment
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