import React from 'react-native';

const {
  ProgressBarAndroid,
} = React;

export default function (props) {
  return (
    <ProgressBarAndroid {...props} styleAttr="Inverse" />
  )
};
