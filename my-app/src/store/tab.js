import Cookie from 'js-cookie'

//管理菜单数据
export default{
    namespaced: true,   //开启命名空间
    state:{
        isCollapse: false,       //控制左侧菜单展开/收起
        tabsList :[             //面包屑数据
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        menu: []
    },
    actions:{},
    mutations:{
        //修改isCollapse的值的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state, value){
            if (value.name !== 'home'){
                const index = state.tabsList.findIndex(
                        item => item.name === value.name 
                    )
                //若不相等
                if (index === -1){
                    state.tabsList.push(value)
                }
            }
        },
        //删除指定tag数据
        closeTag(state,item){
            // console.log(item)
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)            
        },
        
        //动态获取路由(登录接口传回该用户可见的路由)
        setMenu(state,value){
            state.menu = value
            Cookie.set('menu',JSON.stringify(value))
        },


    }


}