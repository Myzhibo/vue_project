//管理菜单数据
export default{
    namespaced: true,   //开启命名空间
    state:{
        isCollapse: false       //控制左侧菜单展开/收起
    },
    actions:{},
    mutations:{
        //修改isCollapse的值的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}