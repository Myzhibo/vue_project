<template>
  <div class="tags">
        <el-tag
            size= 'small'
            v-for="(item, index) in tabsList"
            :key="item.path"
            :closable = "item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
            >
            {{ item.label }}
        </el-tag>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name:'Commontag',
        data(){
            return {

            }
        },

        computed:{
            ...mapState('tab',['tabsList'])
        },
        methods: {
            ...mapMutations('tab',['closeTag']),

            changeMenu(item){
                this.$router.push(item.name)
            },
            handleClose(item, index){
                this.closeTag(item) //调用store中的mutation
                const length = this.tabsList.length
                //删除tag跳转路由
                if(item.name !== this.$route.name){     //删除的不是当前界面显示的路由的tag，不做跳转
                    return
                }
                //删除最后一项,向前一项跳转
                if(index === length){
                    this.$router.push({
                        name: this.tabsList[index -1].name
                    })
                }else{
                    this.$router.push({
                        name: this.tabsList[index].name
                    })
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.tags{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;            //小手样式
    }
}
</style>