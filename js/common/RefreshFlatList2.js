/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

export default class RefreshFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "java",
            isRefresh: false,//刷新
            dataArray: [],
        }
    }
    static defaultProps={
        footerView: PropTypes.element,
    }
    static defaultProps = {
        onRefreshs: () => {
        },
        isDownLoad: false,
        footerView: () => {
        },
    }

    refreshStar() {
        this.setState({
            isRefresh: true,
        });
    }

    /**
     * 初次设置数据
     * @param data
     */
    setData(data) {
        this.setState({
            isFrist: false,
            isRefresh: false,
            isDownLoad: !data ? false : data.length < this.props.minLength ? false : this.props.isDownLoad,
            dataArray: data,
        });
    }

    /**
     * 在原数据的基础上添加数据
     * @param data
     */
    addData(data) {
        if (!data || data.length < 1) {
            this.setState({
                isDownLoad: false,
            });
            return
        }
        let arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i])
        }
        arr = this.state.dataArray.concat(arr)
        this.setState({
            dataArray: arr,
        });
    }

    render() {
        const {onRefreshs,footerView,...other} = this.props
        return <View style={styles.container}>
            <FlatList
                 {...other}
                //renderItem={other.renderItem}
                //设置数据
                data={this.state.dataArray}
                //  renderItem={(items) => this.props.renderRow(items)}
                refreshControl={
                    <RefreshControl
                        //Android下只有一个 colors 是转圈的颜色
                        colors={['#d15', '#000']}
                        //ios 下 可以设置标题，转圈颜色，标题颜色
                        title={'Loading...'}
                        tintColor={'#d15'}
                        titleColor={'#d15'}
                        //刷新状态 false:隐藏，true:显示
                        refreshing={this.state.isRefresh}
                        //刷新触发的后执行的方法
                        onRefresh={() => onRefreshs()}
                    />
                }
                //定义加载更多控件
                ListFooterComponent={footerView()}
            />
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
