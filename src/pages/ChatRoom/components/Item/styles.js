/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../../../global';

const ImageStyle = styled.Image``;

export const Container = styled.TouchableOpacity`
  background-color: ${({selected}) => selected ? '#0B0B0B' : 'transparent'};
  padding: 7px 15px;
`;

export const Content = styled.View`
  /* padding: 10px 15px; */
  padding-bottom: 15px;
  border-radius: 8px;
  border-width: 0;
  background-color: ${({user}) =>
    user ? colors.lightGrey : colors.darkGrey};
  border-bottom-right-radius: ${({user}) => (user ? '1px' : '8px')};
  border-bottom-left-radius: ${({user}) => (!user ? '1px' : '8px')};
  align-self: stretch;
  max-width: 65%;
  min-width: ${({hasImage}) => hasImage ? '65%' : '45%'};
  margin-left: ${({user}) =>
    user ? 'auto' : 0};
`;

export const AdjustMarginText = styled.View`
  flex-direction: row;
  flex: 2;
  padding: 0 15px;
  padding-top: ${({topSpace}) => topSpace ? 10 : 0}px;
  justify-content: ${({alignRight}) => alignRight ? 'flex-end' : 'flex-start'};
`;

export const HeaderOwnerMsg = styled.Text`
  color: ${colors.lightGrey};
  font-size: ${fonts.fontSize14};
  font-family: ${fonts.robotoRegular};
  text-align: left;
  padding-bottom: 1%;
`;

export const FowardMessage = styled.Text`
  color: ${colors.darkGrey};
  font-size: ${fonts.fontSize14};
  font-family: ${fonts.robotoLight};
  text-align: left;
  padding-bottom: 1%;
`;

export const TextStyled = styled.Text`
  color: ${({user}) =>
    user ? colors.black : colors.white};
  font-size: ${fonts.fontSize16};
  font-family: ${fonts.robotoRegular};
  /* text-align: ${({user}) => (user ? 'left' : 'right')}; */
  text-align: left;
`;

export const TextStyledTwo = styled.Text`
  color: ${({user}) =>
    user ? colors.black : colors.white};
  font-size: ${fonts.fontSize16};
  font-family: ${fonts.robotoRegular};
  /* text-align: ${({user}) => (user ? 'left' : 'right')}; */
  text-align: left;
`;

export const SubTextStyled = styled.Text`
  color: ${({user}) => (user ? colors.grey : colors.lightGrey)};
  font-size: ${fonts.fontSize10};
  padding-top: 1%;
  font-family: ${fonts.robotoRegular};
  text-align: right;
`;

export const Icon = styled(SimpleLineIcon)``;

export const Image = styled(ImageStyle).attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  max-height: 250px;
  min-height: 250px;
  border-radius: 12px;
  /* background: white; */
  align-self: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 9px 15px;
  border-top-left-radius: ${({hasPreviousContent}) => hasPreviousContent ? 0 : 8}px;
  border-top-right-radius: ${({hasPreviousContent}) => hasPreviousContent ? 0 : 8}px;
  background-color: ${colors.grey};
`;

export const ImageContainer = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.softGrey};
  position: relative;
  margin-right: 6px;
`;

export const SharedContentImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-self: center;
`;

export const SharedContentTitle = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  text-align: left;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;
