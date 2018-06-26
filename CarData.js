/**
 * Created by zhengnan on 2018/6/26.
 */

import { observable, action,computed } from "mobx";

class CarData{

    @observable carArray = [];
    @observable isAllSelect = false;
    @observable sumPrice = 0;
    @observable sumNumber = 0;

   @action
    setData=(array)=>{
       this.carArray = array;
    };

   @action
    plus =(index)=>{
       this.carArray[index].number+=1;
    };

    @action
     minus=(index)=>{
       if(this.carArray[index].number<=0)   return;
       this.carArray[index].number-=1;
     };

    @action
    checked=(index,isSelect)=>{
        this.carArray[index].isSelect = isSelect;

        if(!isSelect){
            this.isAllSelect = false;
        }else {
            let tmpAllSelect = true;
            for (let info in this.carArray){
                if(!info.isSelect){
                    tmpAllSelect = false;
                    break;
                }
            }
            this.isAllSelect = tmpAllSelect;
        }
    };

    @action
    allCheced=(isSelect)=>{
        for(let i=0;i<this.carArray.length;i++){

        }
    }

    @action
    getSumPrice=()=>{
        return this.carArray.reduce((a,b)=>{
            if(b.isSelect){
                return a+b.number *b.price
            }else {
                return a;
            }
        },0);
    };

    @action
    getSumNumber=()=>{
        return this.carArray.reduce((a,b)=>{
            if(b.isSelect){
                return a+b.number;
            }else {
                return a;
            }
        },0);
    };

}


