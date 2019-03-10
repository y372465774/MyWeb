function get_base_option_with_data(data){
    let base_opion = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            hideDelay: 1500,
            enterable: true
        },
        series: [
            {
                type: 'tree',

                data: [data],

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '10%',

                symbolSize: [150,50],
                symbol:'rect', //roundRect
                tooltip:{
                    formatter: function (params, ticket, callback) {
                        //window.console.log(params.data);
                        let dt  = params.data;
                        setTimeout(function(){
                            //let x = params.data.name;
                            //window.console.log(x);
                            callback(ticket, dt['iname']);
                        }, 1);
                        return 'loading';
                    },
                    enterable:true,
                    hideDelay:1000
                },
                lineStyle:{
                    width:3
                },
                itemStyle:{
                    color:'#fff',
                    borderColor:'#000',
                    borderType:'solid',
                    shadowOffsetX:0,
                    borderWidth:1
                },
                label: {
                    normal: {
                        position: 'insideLeft',
                        verticalAlign: 'middle',
                        //align: 'right',
                        fontSize: 16,
                        formatter: (params)=>{
                            //return '<h1>' + params.data.iname + '</h1>'
                            return params.data.iname;
                            //return 'ok';
                        }
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'insideLeft',
                            verticalAlign: 'middle',
                            fontSize: 16
                            //align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    return base_opion;
}

exports.get_base_option_with_data = get_base_option_with_data