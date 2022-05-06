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
