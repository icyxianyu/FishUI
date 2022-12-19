import Selector from "./components/Selector"
import "./icon/iconfont.css"
let FishUI={};


FishUI.install=function(Vue){
    Vue.component(Selector.name,Selector)
}

export default FishUI;