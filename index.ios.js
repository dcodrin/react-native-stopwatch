// npm modules
import React from 'react';
import {View, Text, AppRegistry, StyleSheet, TouchableHighlight} from 'react-native';

// app modules

class StopWatch extends React.Component {
    constructor() {
        super();

        this.startStopButton = this.startStopButton.bind(this);
        this.lapButton = this.lapButton.bind(this);
        this.border = this.border.bind(this);
        this.handleStartPress = this.handleStartPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>{/*Main App*/}
                <View style={[styles.header, this.border('yellow')]}>{/*Timer and buttons*/}
                    <View style={[this.border('red'), styles.timerWrapper]}>{/*Timer*/}
                        <Text>
                            00:00:00
                        </Text>
                    </View>
                    <View style={[this.border('green'), styles.buttonWrapper]}>{/*Buttons*/}
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>
                </View>
                <View style={[styles.footer, this.border('blue')]}>{/*List of laps*/}
                    <Text>
                        The list of laps goes here
                    </Text>
                </View>
            </View>
        );
    }

    handleStartPress() {

    }

    startStopButton() {
        return ( <TouchableHighlight underlayColor={'gray'} onPress={this.handleStartPress}>
            <Text>
                Start
            </Text>
        </TouchableHighlight>);
    }

    lapButton() {
        return ( <TouchableHighlight underlayColor={'gray'} onPress={() => console.log('clicked Lap')}>
            <Text>
                Lap
            </Text>
        </TouchableHighlight>);
    }

    border(color) {
        return {
            borderColor: color,
            borderWidth: 4
        };
    }
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
        flex: 5, // takes 5/8
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper : {
        flex: 3,  // takes 3/8
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);