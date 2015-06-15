/**
 * Created by chris on 6/8/15.
 */
var LightManager = React.createClass({
    getInitialState: function() {
        return {
            lights: [],
            cards: []
        }
    },
    changeName: function(id){
        var self = this;
        var name = self.refs['light-' + id + '-name'].getDOMNode().value;
        $.ajax({
            url: api+"/setName/"+id,
            method: 'POST',
            data: name
        }).done(function(data){
            console.log("test")
        });
    },
    componentDidMount: function() {
        var self = this;
        $.ajax({
            url: api+"/lights"
        }).done(function(data){
            _.forEach(data,function(light,i){
                self.state.lights.push(
                    {name: light.name, id: i, checked: false}
                );
            });
            self.forceUpdate();
        });
    },
    render: function() {
        var self = this;
        _.forEach(self.state.lights,function(light){
            console.log("TEST");
            self.state.cards.push(
                <div className="row light-manage-card">
                    <div className="one-half column">
                        <div className="row">
                            <h4>{light.name}</h4>
                        </div>
                        <div className="row">
                            <input type="text" ref={'light-'+light.id+'-name'}  />
                            <button onClick={self.changeName.bind(null,light.id)}>Save</button>
                        </div>
                    </div>
                </div>
            );
        });
        return <div className="block" >{self.state.cards}</div>;
    }
});