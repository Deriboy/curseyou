<template>
    <div>
        <table class="table table-bordered">
            <tr><th>Name</th><th>Latest Version</th><th></th></tr>
            <searchItem 
                v-for="(item, index) in list"
                v-bind:item=item
                v-bind:key=index
                v-on:add="$emit('add',$event)"
            ></searchItem>
            <tr v-if="list.length==0"><td colspan=3>No results</td></tr>
        </table>
    </div>
</template>
<script>
import searchItem from '../components/searchItem'

export default {
    name: 'searchList',
    props: ['list'],
    components: {
        searchItem,
    },
    data() {
        return {

        }
    }
}
</script>