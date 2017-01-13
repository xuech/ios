'use strict';

import _ from 'lodash';

class OrdersModel {

    constructor() {
        this.resetOrders();
    }

    resetOrders() {
        this.pager = 1;
        this.orders = {
            total: 0,
            list: []
        };

        this.canLoadMoreResults = true;

        return this;
    }

    loadOrders() {
        let params = {
            page: this.pager
        };

        return this._service.findAll(params).then(orders => {
            ++this.pager;
            this._handleUpdatingOrders(orders);
            this._$log.debug('Orders loaded', orders);
        });
    }

    _handleUpdatingOrders(orders) {
        this.orders.total = orders.total;
        //this.orders.list  =orders.list;
        //this.orders.list  = _.union( this.orders.list, orders.list );
        this.orders.list = this.myUnion(this.orders.list, orders.list);
        this._$log.debug('OrderList', this.orders.list);
        this.canLoadMoreResults = this.orders.list.length < this.orders.total;
    }

    myUnion(list1, list2) {
        var list3=new Array();
        for (x in list1) {
            var flag=true;
            for (y in list2) {
                if (x.orderId == y.orderId) {
                   flag=false;
                    break;
                }
            }
           if (flag){
               list3.push(x);
           }
        }
        return list2.concat(list3);
    }
    //myUnion(list1, list2) {
    //    var list3 = list1.concat(list2);
    //    for (x in list1) {
    //        for (y in list2) {
    //            if (x.orderId == y.orderId) {
    //                let index = list3.indexOf(x);
    //                if (index > -1) {
    //                    list3.splice(index, 1);
    //                }
    //            }
    //        }
    //
    //    }
    //    return list3;
    //}
}


export default function () {

    this.instance = new OrdersModel();

    this.$get = ['$log', 'OrdersService', 'OrdersTransformerOrders', ($log, OrdersService, OrdersTransformerOrders) => {
        this.instance._$log = $log;
        this.instance._service = new OrdersService();

        return this.instance;
    }];

}
