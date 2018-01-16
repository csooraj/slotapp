import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { AppTourView } from 'react-native-taptargetview'

class Bottom extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={'Bottom Left'}
          ref={ref => {
            this.props.addAppTour &&
              this.props.addAppTourTarget(
                AppTourView.for(ref, {
                  title: 'This is a target button 6',
                  description: 'We have the best targets, believe me',
                  outerCircleColor: 'outerCircleColorPrimary'
                })
              )
          }}
          onPress={() => {}}
        />
        <Button
          title={'Bottom Right'}
          ref={ref => {
            this.props.addAppTour &&
              this.props.addAppTourTarget(
                AppTourView.for(ref, {
                  title: 'This is a target button 7',
                  description: 'We have the best targets, believe me',
                  outerCircleColor: 'outerCircleColorSecondary'
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

export default Bottom
