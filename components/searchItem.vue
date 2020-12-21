<template>
    <tr>
        <td> <a :href="item.websiteUrl"> {{item.name}}  </a> </td>
        <td> {{item.gameVersionLatestFiles[0].gameVersion}} </td>
        <td> <button v-on:click="$emit('add',item)" type="button" class="btn btn-primary btn-sm">Add</button></td>
    </tr>
</template>
<script>
export default {
    name: 'searchItem',
    props: ['item'],
    data() {
        return {
            
        }
    },
    methods: {
        add() {

        },
    }
}
</script>