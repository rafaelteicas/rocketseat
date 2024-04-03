import { Canvas, Rect, BlurMask } from '@shopify/react-native-skia'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { THEME } from '../../styles/theme'

const STATUS = ['transparent', THEME.COLORS.BRAND_LIGHT, THEME.COLORS.DANGER_LIGHT]

type Props = { 
  status: number
}

export default function OverlayFeedback({status} : Props) {
  const opacity = useSharedValue(0)
  const {width, height} = useWindowDimensions()
  const color = STATUS[status]

  const styledAnimated = useAnimatedStyle(() => ({

  }))

  useEffect(() => {
    opacity.value = withSequence(withTiming(1, {duration: 400, easing: Easing.bounce}), withTiming(0))
  } , [status])

  return (
    <Animated.View style={[{ height, width, position: 'absolute' }, styledAnimated ]}>
      <Canvas style={{flex: 1}}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          color={color}
        >
          <BlurMask blur={50} style='inner' />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
