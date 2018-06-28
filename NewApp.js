/**
 * Created by zhengnan on 2018/6/27.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

import { observable,action,computed } from 'mobx';
import { observer } from 'mobx-react/native';
import carData from  './CarData';
import MobxCell from './MobxCell';

@observer
export default class NewApp extends Component{


    constructor(props) {
        super(props);

        this.carData = carData;

        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1==r2})
        this.state={
            dataSource:ds.cloneWithRows(this.carData.carArray),
        }

    }

    componentDidMount() {
        this.data = [
            {
                isSelect:false,
                title: '商品1',
                price:10,
                number:2
            }, {
                isSelect:false,
                title: '商品2',
                price:11,
                number:1
            }, {
                isSelect:false,
                title: '商品3',
                price:12,
                number:3
            }, {
                isSelect:false,
                title: '商品4',
                price:14,
                number:1
            },
        ];
        this.carData.addData(this.data);
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.carData.carArray),

        });
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.navigationView}>
                    <Text style={styles.navigationText}>Mobx演示</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={this.renderRow} renderSeparator={this.renderSeparator}/>
                <View style={styles.footView}>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={this.allSelectAction}>
                        <View style={{height:20,width:20,borderRadius:10,backgroundColor:this.carData.isAllSelect?'yellow':'white'}}/>
                        <Text style={{color:'white',marginLeft:10}}>全选</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'white'}}>合计：{this.carData.sumPrice.get()}元</Text>
                    </View>
                </View>
            </View>
        );
    }

    // 全选
    allSelectAction=()=>{

      this.carData.allCheced();

    }


    @action
    delectClick=(index)=>{
       this.carData.delectItem(index);
       // 修改数据数目，最后还是通知下list，不然会报数据异常的错误
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.carData.carArray)
        })
    };

    renderRow =(rowData,sectionID,rowID)=> {
        return(
            <MobxCell  index={rowID} cellData={rowData}  data={this.carData} rowSelectClick={this.rowSelectClick} delectClick={this.delectClick}/>
        )
    }
    renderSeparator = (sectionID,rowID)=>{
        return(
            <View key={`${sectionID}-${rowID}`} style={{backgroundColor:'white',height:2}}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    navigationView:{
        backgroundColor:'#4ABFF5',
        height:64,
        alignItems:'center',
        justifyContent:'center',
        width:ScreenWidth,
        paddingTop:20
    },
    navigationText:{
        color:'white',
        fontSize:18
    },
    footView:{
        position:'absolute',
        left:0,
        bottom:0,
        right:0,
        height:49,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#4ABFF5',
        padding:15,
        justifyContent:'space-between',

    }
});
