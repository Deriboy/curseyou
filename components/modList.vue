<template>
    <div>
        <table class="table table-bordered">
            
            <tr>
                <th><div :class="{'spinner-border':loading}" role="status">
                    <span class="sr-only">Loading...</span>
                </div></th>
                <th v-for="target in targets" v-bind:key=target> {{ target }} </th>
                <th></th>
            </tr>
            <modItem 
                v-for="item in list"
                v-bind:item=item
                v-bind:key=item.id
                v-bind:targets=targets
                v-bind:files="filesByID(item.id)"
                v-bind:loading=loading
                v-on:remove="$emit('remove',$event)"
            ></modItem>
        </table>
    </div>
</template>
<script>
import modItem from '../components/modItem'

export default {
    name: 'modList',
    props: ['list','targets','files', 'loading'],
    components: {
        modItem,
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        filesByID(id) {
            for (let i = 0; i < this.files.length; i++) {
                const filelist = this.files[i];
                if(filelist.id == id) {
                    return filelist.value;
                }
            }
            return [];
        },
    }
}
</script>