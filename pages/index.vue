<template>
    <div class="container">
            <h1> Mod Version Checker </h1>
        <div class="row mb-3">
            <div class=.col-md-4>
                <h2> Search </h2>
                <label for="search">Mod name</label>
                <input type="text" id="search" v-model=searchBox @keyup.enter="search()">
                <button class="btn btn-info" v-on:click="search">Search</button>
                <searchList v-on:add="addToModList" v-bind:list=searchlist ></searchList>
            </div>
            <div class=.col-md-4>
                <label for="targets">Target versions</label>
                <input type="text" id="targets" v-model=targets>
                <modList v-on:remove="removeFromModList" :targets=targetlist :list=modlist :files=files :loading=loading></modList>
            </div>
        </div>
        <div class="row mb-3">
            <div class=.col-md-4>
            </div>
        </div>
    </div>
</template>
<script>

import "bootstrap/dist/css/bootstrap.min.css"

import searchList from '../components/searchList'
import modList from '../components/modList'

export default {
    name: 'home',
    head: {
        title: 'Test',
    },
    components: {
        searchList,
        modList
    },
    data() {
        return {
            modlist: [],
            searchlist: [],
            files: [],
            searchBox: "",
            targets: "1.7.10,1.12.2,1.16.4",
            loading: false,
        };
    },
    computed: {
        modcount() {
            return this.modlist.length;
        },
        targetlist() {
            var list = this.targets.split(",");
            return list;
        }
    },
    mounted() {
        var url_hash = window.location.hash.substr(1);
        //console.log(url_hash);
        var idlist = url_hash.split(',');
        const options = {
            method: 'GET',
        };
        var promises = [];
        idlist.forEach(id => {
            promises.push(fetch('/api/mod?addonID=' + id,options).then(response => response.json()));
        });

        Promise.all(promises)
        .then(results => {
            //console.log(results);
            results.forEach(newmod => {
                var dupe = false;
                for (let i = 0; i < this.modlist.length; i++) {
                    const mod = this.modlist[i];
                    if(mod.id == newmod.id) {
                        dupe = true;
                        break;
                    }
                }
                if(!dupe) {
                    this.modlist.push({name: newmod.name, id: newmod.id, websiteUrl: newmod.websiteUrl});
                }
            });

            this.check();
        }).catch(err => {
            console.error(err);
        });
    
    },
    methods: {
        search() {
            const options = {
                method: 'GET',
            };
            if(this.searchBox == "") {
                this.searchlist = [];
                return;
            }
            fetch('/api/search?searchFilter=' + this.searchBox,options)
            .then(response => response.json())
            .then(response => {
                this.searchlist = response;
                //console.log(response);
            }).catch(err => {
                console.log(err);
            });
        },
        check() {
            this.loading = true;
            const options = {
                method: 'GET',
            };
            var promises = [];
            this.modlist.forEach(mod => {
                promises.push(fetch('/api/getfiles?addonID=' + mod.id,options).then(response => response.json())
                .then(result => {
                    return {
                        id: mod.id,
                        value: result
                    };
                }));
            });

            Promise.all(promises)
            .then(results => {
                this.files = results;
                this.loading = false;
                //console.log(results);
            }).catch(err => {
                console.error(err);
            });
        },
        updatehash() {
            window.location.hash = this.modlist.reduce((total,mod) => {
                if(total != "") {
                    total += ',';
                }
                return total += mod.id
            },"");
        },
        addToModList(newmod) {
            for (let i = 0; i < this.modlist.length; i++) {
                const mod = this.modlist[i];
                if(mod.id == newmod.id) {
                    return;
                }
            }
            this.modlist.push({name: newmod.name, id: newmod.id, websiteUrl: newmod.websiteUrl});
            this.check();
            this.updatehash();
        },
        removeFromModList(modtoremove) {
            for (let i = 0; i < this.modlist.length; i++) {
                const mod = this.modlist[i];
                if(mod.id == modtoremove.id) {
                    this.modlist.splice(i,1);
                    this.updatehash();
                    return;
                }
            }
            
        }
    }
}
</script>