var api = "/hueapi";
var LightController = React.createClass({
    getInitialState: function() {
        var self = this;
        self.sliderIdle = 0;
        setInterval(timerIncrement, 100);
        function timerIncrement() {
            self.sliderIdle = self.sliderIdle  + 1;
        }
        return {}
    },
    handleOff: function(){
        var self = this;
        var lights = self.refs.selectedLights.state.options;

        _.forIn(lights, function(n){
            if(n.checked){
                turnOn(n.id);
            }
        });

        function turnOn(lightId){
            $.ajax({
                method:'POST',
                url: api+"/power/"+lightId
            }).done(function(data){
                console.log(data);
            });
        }
        console.log("on");
    },
    handleEffect: function(effect){
        var self = this;
        var lights = self.refs.selectedLights.state.options;
        _.forIn(lights, function(n){
            if(n.checked){
                setEffect(n.id,effect);
            }
        });
        function setEffect(lightId, effect){
            $.ajax({
                method: 'POST',
                url: api + "/loop/" + lightId + "/" + (effect === "colorloop" ? 1 : 0)
            }).done(function (data) {
                console.log(data);
            });

        }
    },
    handleAlert: function(alert){
        var self = this;
        var lights = self.refs.selectedLights.state.options;
        _.forIn(lights, function(n){
            if(n.checked){
                setEffect(n.id,alert);
            }
        });
        function setEffect(lightId, alert){
            $.ajax({
                method: 'POST',
                url: api + "/alert/" + lightId,
                data: alert
            }).done(function (data) {
                console.log(data);
            });

        }
    },
    handleColorChange: function(){
        var self = this;
        if(self.sliderIdle > 4) {
            var lights = self.refs.selectedLights.state.options;
            var lightColor = this.refs.selectedColor.getDOMNode().value;

            _.forIn(lights, function (n) {
                if (n.checked) {
                    setColor(n.id, lightColor);
                }
            });
            self.sliderIdle = 0;
        }

        function setColor(lightId, lightColor){
                $.ajax({
                    method: 'POST',
                    url: api + "/setLightColor/" + lightId + "/" + lightColor
                }).done(function (data) {
                    console.log(data);
                });

        }
    },
    handleTempChange: function(){
        var self = this;
        if(self.sliderIdle > 4) {
            var lights = self.refs.selectedLights.state.options;
            var lightColor = this.refs.selectedTemperature.getDOMNode().value;

            _.forIn(lights, function (n) {
                if (n.checked) {
                    setColor(n.id, lightColor);
                }
            });
            self.sliderIdle = 0;
        }

        function setColor(lightId, lightColor){
            $.ajax({
                method: 'POST',
                url: api + "/setLightTemperature/" + lightId + "/" + lightColor
            }).done(function (data) {
                console.log(data);
            });

        }
    },
    handleBrightnessChange: function(){
        var self = this;
        if(self.sliderIdle > 4) {
            var lights = self.refs.selectedLights.state.options;
            var lightBrightness = this.refs.selectedBrightness.getDOMNode().value;

            _.forIn(lights, function (n) {
                if (n.checked) {
                    setBrightness(n.id, lightBrightness);
                }
            });
            self.sliderIdle = 0;
        }

        function setBrightness(lightId, lightBrightness){
            $.ajax({
                method: 'POST',
                url: api + "/setLightBrightness/" + lightId + "/" + lightBrightness
            }).done(function (data) {
                console.log(data);
            });

        }
    },
    handleOn: function(){
        var self = this;
        var lights = self.refs.selectedLights.state.options;
        var lightColor = this.refs.selectedColor.getDOMNode().value;

        _.forIn(lights, function(n){
            if(n.checked){
                turnOn(n.id,lightColor);
            }
        });

        function turnOn(lightId, lightColor){
            $.ajax({
                method:'POST',
                url: api+"/setLightColor/"+lightId+"/"+lightColor
            }).done(function(data){
                console.log(data);
            });
        }
        console.log("on")
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="one-half column">
                        <GroupLightSelect ref="selectedLights" />
                    </div>
                    <div className="one-half column">
                        <LightEffects handleEffect={this.handleEffect} handleAlert={this.handleAlert}/>
                     </div>
                </div>
                <div className="row">
                    <div className="one-full column">
                        <input className="block rainbow" onChange={this.handleColorChange} type="range" max="65280" min="0" ref="selectedColor"/>
                    </div>
                </div>
                <div className="row">
                    <div className="one-full column">
                        <input className="block brightness" onChange={this.handleBrightnessChange} type="range" max="254" min="0" ref="selectedBrightness"/>
                    </div>
                </div>
                <div className="row">
                    <div className="one-full column">
                        <input className="block temperature" onChange={this.handleTempChange} type="range" max="500" min="153" ref="selectedTemperature"/>
                    </div>
                </div>
                <div className="row">
                    <div className="one-half column">
                        <button className="block" onClick={this.handleOn}>
                            Turn on
                        </button>
                    </div>
                    <div className="one-half column">
                        <button className="block" onClick={this.handleOff}>
                            Turn off
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="one-half column">
                        <LightManager/>
                    </div>
                    <div className="one-half column">
                        Group Manager
                    </div>
                </div>
            </div>
        );
    }
});


var LightSelect = React.createClass({
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
            _.forEach(data,function(team,i){
                self.state.options.push(
                    <option key={i} value={i}>{team}</option>
                );
                self.forceUpdate();
            });
        });

    },
    render: function() {
        return <select className="one-full column" ref={this.props.ref} >{this.state.options}</select>;
    }
});

React.render(
    <LightController />,
    document.getElementById('main')
);