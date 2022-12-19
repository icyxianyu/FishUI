<template>
    <div class="InputBox" >
        <input type="text" 
               class="Input"
               :class="{'change':blur}" 
               v-model="InputValue" 
               @focus="changeFocus"
               @blur="changeBlur"
               :placeholder="placeholder"
               ref="InputRef"/>
        <span class="iconfont place" 
              :class="className"/>
    </div>
</template>

<script>
import {watch,ref} from "vue"
import {debounce} from "lodash"
export default {
    name: 'Input',
    props:{
        placeholder:{
            typs:String,
            default:"请输入"
        },
        blur:{
            type:Boolean,
            default:false
        },
        clickValue:Array
    },
    setup(props,{emit}){
        let InputValue=ref("");
        let className=ref("icon-a-tianjia2");
        const InputRef = ref(null)
        watch(InputValue,debounce((newV)=>{
            emit("changeValue",newV)
        },[200]))

        watch(()=>props.blur,()=>{
            if(props.blur===false)
                InputRef.value.blur()
        })
        watch(()=>props.clickValue,()=>{
            InputValue.value=props.clickValue[0]
        })
        const changeBlur=()=>{
            className.value="icon-a-tianjia2";
            emit("changeblur",false)
        }

        return{
            InputValue,
            className,
            InputRef,
            changeBlur
        }
    },
    methods: {
        changeFocus(){
            this.className="icon-sousuo";
            this.$emit("changeblur",true)
        },

    }
};
</script>

<style lang="less" scoped>
@blur:#c4c7ce;
@focus:#4e71f2;
    .InputBox{
        position:relative;
        width:100%;
        .Input{
            box-sizing: border-box;
            height:30px;
            display:inline-block;
            border:2px solid @blur;
            border-radius:10px;
            outline: none;
            width:100%;
        }
        .change{
            border-bottom:0px;
            border-radius:10px 10px 0 0; 
            border-color:#4e71f2
        }
        .place{
            position:absolute;
            right:2px;
            top:50%;
            transform:translateY(-50%)
        }
    }
    

</style>