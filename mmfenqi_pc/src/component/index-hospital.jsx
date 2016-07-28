/**
 * Created by sheldon on 2016/7/27.
 */
'use strict';

class R_IndexHospital extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitals: []
        }
    }

    componentWillMount() {
        this.getHospital()
    }

    getHospital() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_cooperative_hospital',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({hospitals: res.data.cooperativeHospital})
                }
            }
        })
    }

    render() {

        //var counter = 0;
        var tempFive = [];

        //var tempHospital = this.state.hospitals.forEach(function (item) {
        //    counter++;
        //    tempFive.push(item);
        //    if (counter%5 == 0){
        //
        //    }
        //});

        for (var i=0; i<this.state.hospitals.length; i++) {
            var index = parseInt(i / 5);

            tempFive[index] = tempFive[index] || [];
            tempFive[index].push(this.state.hospitals[i]);
        }

        console.log(tempFive);


        var hospitals = tempFive.map(function (item, index) {

            var tdNodes = item.map(function (subItem, subIndex) {
                return (
                    <td style={{border:'#DFDFDF 1px solid'}}>
                        <div key={subIndex}>
                            <img src={subItem.linkHerPic} style={{width:239,height:88}}/>
                        </div>
                    </td>
                )
            });

            return (
                <tr key={index} style={{border:'#DFDFDF 1px solid'}}>
                    {tdNodes}
                </tr>
            )
        });

        return (
            <div className="wrap">
                <table style={{borderCollapse:'collapse',border:'#DFDFDF 1px solid'}}>
                    <tbody>
                    {hospitals}
                    </tbody>
                </table>

                <div style={{clear:'both'}}>
                </div>
            </div>
        )

    }
}