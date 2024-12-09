<template>
    <div class="alert position-fixed bottom-0 start-50 translate-middle" :class="`alert-${type}`" role="alert">
        {{message}}
    </div>
</template>
<script>
export default {
    name: 'Alert',
    props: ['type', 'message']
}
</script>