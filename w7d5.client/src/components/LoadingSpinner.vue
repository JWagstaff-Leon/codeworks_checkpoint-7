<template>
    <div class="flex-grow-1 d-flex justify-content-center align-items-center bg-dark">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading</span>
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
.spinner-border
{
    width: 8rem;
    height: 8rem;
    border-width: 10px;
}
</style>