import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { AppTourView } from 'react-native-taptargetview'

class Center extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={'Center Left'}
          ref={ref => {
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(
                AppTourView.for(ref, {
                  title: 'This is a target button 3',
                  description: 'We have the best targets, believe me',
                  outerCircleColor: 'outerCircleColorPrimary'
                })
              )
          }}
          onPress={() => {}}
        />
        <Button
          title={'Center Center'}
          ref={ref => {
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(
                AppTourView.for(ref, {
                  title: 'This is a target button 4',
                  description: 'We have the best targets, believe me',
                  outerCircleColor: 'outerCircleColorSecondary'
                })
              )
          }}
          onPress={() => {}}
        />
        <Button
          title={'Center Right'}
          ref={ref => {
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(
                AppTourView.for(ref, {
                  title: 'This is a target button 5',
                  description: 'We have the best targets, believe me',
                  outerCircleColor: 'outerCircleColorPrimary'
                })
              )
          }}
          onPress={() => {}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Center
