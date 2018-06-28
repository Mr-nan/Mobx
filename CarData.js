/**
 * Created by zhengnan on 2018/6/26.
 */

import { observable, action,computed } from "mobx";

class CarData{

    @observable carArray = [];
    @observable isAllSelect = false;
    @observable sumPrice = 0;
    @observable sumNumber = 0;

    constructor(){
        this.isAllSelect = false;
        this.sumPrice=computed(()=>{
            return this.carArray.reduce((a,b)=>{
                if(b.isSelect){
                    return a+b.number *b.price
                }else {
                    return a;
                }
            },0);
        });

        this.sumNumber = computed(()=>{
            return this.carArray.reduce((a,b)=>{
                if(b.isSelect){
                    return a+b.number;
                }else {
                    return a;
                }
            },0);
        });

    }

    addData(array){
       this.carArray = array;
    }

   @action // 数量加1
    plus(index){
       this.carArray[index].number+=1;
    };

    @action // 数量减1
     minus(index){
       if(this.carArray[index].number<=0)   return;
       this.carArray[index].number-=1;
     };

    @action // 单选按钮事件
    checked(index){
        let isSelect = !this.carArray[index].isSelect;
        this.carArray[index].isSelect = isSelect;

        if(!isSelect){
            this.isAllSelect = false;
        }else {
           this.checkedType();
        }
    };

    @action //全选按钮事件
    allCheced(){

        if(this.carArray.length<=0) return;

        let isSelect = !this.isAllSelect;
        this.isAllSelect = isSelect;

        this.carArray.forEach(e=>{
           e.isSelect = isSelect;
        });

        // for(let i=0;i<this.carArray.length;i++){
        //         this.carArray[i].isSelect = isSelect;
        // }
    }


    @action //删除
    delectItem(index){
        this.carArray.splice(index,1);
        if(this.carArray.length<=0){
            this.isAllSelect = false;
        }else {
            this.checkedType();

        }
    }

    checkedType(){

        let  tmpSelect = true;
        for (let data of this.carArray){
            if(!data.isSelect){
                tmpSelect = false;
                break;
            }
        }
       this.isAllSelect = tmpSelect;
    }

}

export  default  new CarData();

