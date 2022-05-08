<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="modal-title-slot"></slot>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="modal-body-slot"></slot>
                </div>
        </div>
    </div>
</template>

<script>
export default
{
    setup()
    {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>