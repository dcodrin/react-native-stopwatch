// npm modules
import React from 'react';
import {View, Text, AppRegistry, StyleSheet, TouchableHighlight} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
// app modules

class StopWatch extends React.Component {
    constructor() {
        super();

        this.state = {
            timeElapsed: null,
            startTime: null,
            lapTime: null,
            lapTimeElapsed: null,
            laps: [],
            running: false
        };

        this.startStopButton = this.startStopButton.bind(this);
        this.lapButton = this.lapButton.bind(this);
        //this.border = this.border.bind(this);
        this.handleStartPress = this.handleStartPress.bind(this);
        this.handleLapPress = this.handleLapPress.bind(this);
        this.handleLapInterval = this.handleLapInterval.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>{/*Main App*/}
                <View style={[styles.header]}>{/*Timer and buttons*/}
                    <View style={[styles.timerWrapper]}>{/*Timer*/}
                        <Text style={styles.clearText}></Text>
                        <Text style={styles.timer}>
                            {formatTime(this.state.timeElapsed)}
                        </Text>
                    </View>
                    <View style={[styles.lapTimerWrapper]}>{/*Timer*/}
                        <Text style={styles.clearText}></Text>
                        <Text style={styles.lapTimer}>
                            {formatTime(this.state.lapTimeElapsed)}
                        </Text>
                    </View>
                    <View style={[styles.buttonWrapper]}>{/*Buttons*/}
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>
                </View>
                <View style={[styles.footer]}>{/*List of laps*/}
                    {this.state.laps.map((lap, i) =>
                        <View style={styles.lap} key={lap + i}>
                            <Text style={styles.lapText}>
                                Lap {i + 1}
                            </Text>
                            <Text style={styles.lapText}>
                                {lap}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    handleStartPress() {

        if (this.state.running) {
            console.log(this.state);
            clearInterval(this.interval);
            clearInterval(this.lapInterval);
            this.setState({running: false});
            return;
        }
        this.setState({
            startTime: new Date().getTime() - this.state.timeElapsed
        });

        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date().getTime() - this.state.startTime,
                running: true
            });
        }, 30);

        this.handleLapInterval('pause');
    }

    handleLapInterval(option) {

        clearInterval(this.lapInterval);

        if (option === 'reset') {
            this.setState({
                lapTime: new Date().getTime()
            });
        } else {
            this.setState({
                lapTime: new Date().getTime() - this.state.lapTimeElapsed
            });
        }

        this.lapInterval = setInterval(() => {
            this.setState({
                lapTimeElapsed: new Date().getTime() - this.state.lapTime
            });
        }, 30);
    }

    handleLapPress() {
        if (!this.state.running && this.state.timeElapsed) {
            clearInterval(this.lapInterval);
            this.setState({
                startTime: null,
                timeElapsed: null,
                lapTime: null,
                lapTimeElapsed: null,
                laps: [],
                running: false
            });
            return;
        }

        this.setState({
            laps: [...this.state.laps, formatTime(this.state.lapTimeElapsed)],
            lapTimeElapsed: null,
            lapTime: null
        });

        this.handleLapInterval('reset');

    }

    startStopButton() {

        const style = this.state.running ? styles.stopButton : styles.startButton;

        return (<TouchableHighlight style={[styles.button, style]} underlayColor={'gray'}
                                    onPress={this.handleStartPress}>
            <Text>
                {this.state.running ? 'Stop' : 'Start'}
            </Text>
        </TouchableHighlight>);
    }

    lapButton() {

        let style = styles.lapDefault;

        if (!this.state.running && this.state.timeElapsed) {
            style = styles.resetButton;
        }

        if (this.state.running) {
            style = styles.startButton;
        }

        return (
            <TouchableHighlight style={[styles.button, style]} underlayColor={'gray'}
                                onPress={this.handleLapPress}>
                <Text>
                    {!this.state.running && this.state.timeElapsed ? 'Reset' : 'Lap'}
                </Text>
            </TouchableHighlight>);
    }

    // border(color) {
    //     return {
    //         borderColor: color,
    //         borderWidth: 4
    //     };
    // }
}

const styles = StyleSheet.create({
    container: { //Main app
        flex: 1, //Fill entire screen
        alignItems: 'stretch', //In react-native alignItems by default is horizontal

    },
    header: { //Timer and buttons
        flex: 1
    },
    footer: { //List of laps
        flex: 1
    },
    timerWrapper: {
        flex: 5, // takes 5/8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lapTimerWrapper: {
        flexDirection: 'row'
    },
    buttonWrapper: {
        flex: 3,  // takes 3/8
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    clearText: {
        flex: 1
    },
    timer: {
        flex: 4,
        fontSize: 60,
    },
    lapTimer: {
        flex: 2,
        fontSize: 30,
    },
    button: {
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton: {
        borderColor: '#00CC00'
    },
    stopButton: {
        borderColor: '#CC0000'
    },
    resetButton: {
        borderColor: '#CC0000'
    },
    lapDefault: {
        borderColor: '#D3D3D3'
    },
    lap: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    lapText: {
        fontSize: 30
    }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);