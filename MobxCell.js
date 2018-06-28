/**
 * Created by zhengnan on 2018/6/25.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

import { observer } from 'mobx-react';


@observer
export default class MobxCell extends Component{


    render(){

        const {cellData,data,index} = this.props;


        return(
            <View style={styles.cell}>
                <TouchableOpacity onPress={()=>{data.checked(index)}}>
                    <View style={{height:20,width:20,borderRadius:10,borderWidth:1,borderColor:'#3BB1F1',backgroundColor:cellData.isSelect?'#3BB1F1':'white'}}/>
                </TouchableOpacity>
                <View style={{marginLeft:20,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{marginRight:10,fontSize:16}}>{cellData.title}</Text>
                    <Text >价格:{cellData.price}元</Text>
                </View>
                <View style={{marginLeft:20,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:30}} onPress={()=>{data.minus(index)}}> - </Text>
                    <Text style={{fontSize:30}} >{cellData.number}</Text>
                    <Text style={{fontSize:30}} onPress={()=>{ data.plus(index)}}> + </Text>
                    <Text style={{marginLeft:50}} onPress={()=>{
                       this.props.delectClick(index);
                    }}>删除</Text>
                </View>
        </View>)

    }

}

const styles = StyleSheet.create({
    cell:{
        width:ScreenWidth,
        height:80,
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: '#DBF7F6',
    }
})