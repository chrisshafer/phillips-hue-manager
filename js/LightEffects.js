/**
 * Created by chris on 6/8/15.
 */
var LightEffects = React.createClass({
    getInitialState: function() {
        return {
            options: []
        }
    },
    componentDidMount: function() {
        var self = this;
        $.ajax({
            url: api+"/lights"
        }).done(function(data){
            _.forEach(data,function(light,i){
                console.log(light);
                self.state.options.push(
                    {name: light.name, id: i, checked: false}
                );
            });
            self.forceUpdate();
        });
    },
    render: function() {
        var self = this;
        return <div className="one-full column" >
            <div className="four columns">
                <button className="block" onClick={self.props.handleEffect.bind(null,"colorloop")}>Color loop</button>
            </div>
            <div className="four columns">
                <button className="block" onClick={self.props.handleAlert.bind(null,"select")}>Breathe</button>
            </div>
            <div className="four columns">
                <button className="block" onClick={self.props.handleEffect.bind(null,"none")}>None</button>
            </div>
        </div>;
    }
});