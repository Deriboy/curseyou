<template>
    <tr>
        <td> <a :href="item.websiteUrl"> {{item.name}}  </a></td>
        <td 
            v-for="target in targets" 
            v-bind:key=target 
            v-bind:class="{
                'bg-success': existsforversion(target) && !loading,
                'bg-danger': !existsforversion(target) && !loading,
            }"
            > </td>
        <td> <button v-on:click="$emit('remove',item)" type="button" class="btn btn-danger btn-sm">Remove</button></td>
    </tr>
</template>
<script>
export default {
    name: 'modItem',
    props: ['item','targets','files','loading'],
    methods: {
        existsforversion(version) {
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                if(file.gameVersion.includes(version)) {
                    return true;
                }
            }
            return false;
        },

    },
}
</script>