<template>
    <div class="menubox">
        <div v-for="item of data" :key="item.id" 
            class="single"
            @click="getValue(item.text)">
             {{item.text}}
        </div>
        
        <div class="empty" v-if="data.length===0">
                <div class="emptybox">
                    <span class="iconfont icon-zanwushuju icon"></span>
                    <div>没有搜索结果</div>
                </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Menu',
    props:{
        data:Array,
    },
    setup(props,{emit}){

        const getValue=(item)=>{
            
            emit("clickEvent",item);
        }
        
        return{
            getValue
        }
    }
};
</script>

<style lang="less" scoped>
.menubox{
    border:2px solid #4e71f2;
    border-top:0px;
    padding-bottom:20px;
    .single{
        box-sizing: border-box;
        cursor:pointer;
        transition:all 0.5s;
        padding-left:10px;
        padding-top:5px;
        width:100%;
        position:relative;
        overflow:hidden;
    }
    .single:hover{
        background-color:skyblue;
        color:white;
    }
    .single::after{
        content:"";
        width:90%;
        height:100%;
        display:block;
        border-bottom:1px solid #ccc;
        margin:auto;
    }
    .empty{
        width:100%;
        padding-top:50%;
        position:relative;
        .emptybox{
           position:absolute;
           top:50%;
           left:50%;
           transform:translate(-50%, -50%);
           text-align:center;
           .icon{
               font-size:30px;
            }
        }
    }
}
</style>