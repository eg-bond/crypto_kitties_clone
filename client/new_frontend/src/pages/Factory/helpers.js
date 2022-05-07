export const getEyesShapeClass = eyesShapeNum => {
  return `eyesType${eyesShapeNum}`
}

export const getAnimationClasses = animationNum => {
  return {
    headAnimation: `headAnimation${animationNum}`,
    leftEarAnimation: `leftEarAnimation${animationNum}`,
    rightEarAnimation: `rightEarAnimation${animationNum}`,
    tailAnimation: `tailAnimation${animationNum}`,
  }
}

export const getDecorationClasses = decorationNum => {
  return {
    midDotDecoration: `midDotDecoration${decorationNum}`,
    leftDotDecoration: `leftDotDecoration${decorationNum}`,
    rightDotDecoration: `rightDotDecoration${decorationNum}`,
  }
}

export const getAnimationName = num => {
  const names = {
    0: 'Basic',
    1: 'Moving head',
    2: 'Moving tail',
    3: 'Moving ears',
    4: 'Left ear',
    5: 'Right ear',
    6: 'Attentive',
  }
  return names[num]
}
export const getDecorationName = num => {
  const names = {
    0: 'Basic',
    1: 'Inverted',
    2: 'Twisted',
    3: 'Uniform',
    4: 'Uniform twisted',
    5: 'Tribal',
    6: 'Propeller',
  }
  return names[num]
}
export const getEyesShapeName = num => {
  const names = {
    0: 'Basic',
    1: 'Chill',
    2: 'Cute',
    3: 'Watching',
    4: 'Night',
    5: 'Wonder down',
    6: 'Wonder up',
    7: 'Circle',
  }
  return names[num]
}
