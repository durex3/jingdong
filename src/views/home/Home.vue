<template>
    <div class="wrapper">
       <StaicPart></StaicPart>
       <Nearby></Nearby>
    </div>
    <Docker></Docker>
</template>

<script>
import StaicPart from './StaicPart'
import Nearby from './Nearby'
import Docker from './Docker'

export default {
    name: 'Home',
    components: {
        StaicPart,
        Nearby,
        Docker
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0.5rem;
    padding: 0 0.18rem 0.01rem 0.18rem;
}
</style>
