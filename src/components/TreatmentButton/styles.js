import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts} from '../../global';

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${colors.darkGrey};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  margin-bottom: ${props => (props.isLast ? 30 : 20)}px;
`;

export const Content = styled.View`
  flex-direction: row;
  flex: 1;
  margin-right: 8px;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
`;

export const TreatmentInfoContainer = styled.View`
  margin-left: 8px;
`;

export const TreatmentTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  line-height: 21px;
`;

export const TreatmentDescriptionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 8px;
  min-height: 16px;
  max-height: 48px;
`;

export const TreatmentDescription = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  color: ${colors.lightGrey};
  line-height: 16px;
`;
