<template>
    <div class="Selector"
         @mouseleave="mouseleave"
         @mouseover="mouseover"
         :style='style'
         >
        <Input 
               :placeholder="placeholder" 
               :blur="blur" 
               @changeblur="changeblur"
               @changeValue="changeValue"
               :clickValue="clickValue"
               />

        <div class="menu" 
             v-if="blur"
            @mousedown="mousedown"
             >
            <Menu 
                :data="searchItem" 
                :blur="blur"
                @clickEvent="clickEvent"
                />
        </div>
    </div>
</template>

<script>
import Input from "./Input/Input.vue"
import Menu from "./Menu/Menu.vue"
import {ref} from "vue"
export default {
    name: 'Selector',
    components:{Input,Menu},
    props:{
        placeholder:String,
        data:Array,
        isblur:{
            type:Boolean,
            default:false
        },
        blurtime:{
            type:Number,
            default:5000
        },
        Rule:{
            type:[null,Function],
            default:null
        },
        click:{
            type:[null,Function],
            default:null
        },
        style:{
            type:Object
        }
    },
    setup(props){
        let blur=ref(false);
        let timeout=ref(null);
        let searchItem=ref(props.data);
        let clickValue=ref([])
        const mouseleave=()=>{
            timeout.value=setTimeout(()=>{
                blur.value=false;
            },props.blurtime)
        };
        const changeblur=(value)=>{
            blur.value=value;
        };
        const mouseover=()=>{
            clearTimeout(timeout.value);
            timeout.value=null;
        }
        const changeValue=(value)=>{
            if(props.Rule === null){
                    searchItem.value=props.data.filter((item)=>{
                        return item.text.indexOf(value)>-1
                })
            }
            else if (props.Rule instanceof Function)
                    searchItem.value=props.data.filter(props.Rule)
            else{
                    throw new Error("Rule 需要为 String,RegExp或Function");
            }
        }
        const mousedown=(e)=>{
            e.preventDefault();
        }

        const clickEvent=(e)=>{
            if(props.click instanceof Function)
                props.click(e);
            clickValue.value=[e];
        }
        return{
            blur,
            timeout,
            mouseleave,
            changeblur,
            mouseover,
            searchItem,
            changeValue,
            mousedown,
            clickValue,
            clickEvent
        }
    }
};
</script>

<style lang="less" scoped>
    .Selector{
        position: relative;
        display: inline-block;
        // width:100%;
        .menu{
            position: absolute;
            width:100%;
        }
    }
</style>