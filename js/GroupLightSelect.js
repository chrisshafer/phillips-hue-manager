/**
 * Created by chris on 6/4/15.
 */
// hacked to shit, clean up, binding now working
var GroupLightSelect = React.createClass({
    getInitialState: function() {
        return {
            options: [],
            checks: []
        }
    },
    handleChange: function(id){
        var self = this;
        _.forEach(self.state.options, function(n){
            if(n.id === id){
                n.checked = self.refs['light-' + n.id].getDOMNode().checked;
            }
        });

    },
    componentDidMount: function() {
        var self = this;
        $.ajax({
            url: api+"/lights"
        }).done(function(data){
            _.forEach(data,function(light,i){
                self.state.options.push(
                    {name: light.name, id: i, checked: false}
                );
            });
            self.forceUpdate();
        });
    },
    render: function() {
        var self = this;
        _.forEach(self.state.options,function(light){
            self.state.checks.push(
                <label key={light.id} className="checkbox-container" >
                    {light.name}
                    <input type="checkbox" ref={'light-'+light.id} onChange={self.handleChange.bind(null, light.id)} />
                    <span className="fa fa-check"></span>
                </label>
            );
        });
        return <form className="block" ref={self.props.ref} >{self.state.checks}</form>;
    }
});