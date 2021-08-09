import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../global';

const ImageStyle = styled.Image``;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
`;

export const Content = styled.View`
  flex: 1;
  margin: 0 0 10px;
`;

export const ViewStyled = styled.View`
  /* background-color: red; */
  flex: 1;
  /* padding-bottom: 30%; */
`;

export const ViewMessage = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 15px;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FlatListStyled = styled.FlatList``;

export const TextTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  color: ${colors.white};
  font-size: ${fonts.fontSize16};
  text-align: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
  margin-left: 5px;
`;

export const TextSmall = styled.Text`
  font-family: ${fonts.robotoMedium};
  color: ${colors.white};
  font-size: ${fonts.fontSize16};
  text-align: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const ModalTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  color: ${colors.white};
  font-size: ${fonts.fontSize16};
  width: 100%;
  text-align: center;
`;
export const ModalSelection = styled.Modal``;

export const ModalButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 24px;
`;

export const ModalOption = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ModalButtonText = styled.Text`
  font-family: ${fonts.robotoMedium};
  color: ${colors.white};
  font-size: ${fonts.fontSize16};
  width: 100%;
  text-align: center;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.View`
  background-color: ${colors.white};
  padding: 30px;
  border-radius: 12px;
`;

export const ViewInput = styled.View`
  flex-basis: 80%;
  padding-top: 5%;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  padding-top: 2%;
  flex-basis: 10%;
  padding-left: 2%;
`;

export const Icon = styled(SimpleLineIcon)``;

export const Image = styled(ImageStyle).attrs({
  resizeMode: 'cover',
})`
  position: absolute;
  width: 100%;
  height: 350px;
  /* background: white; */
  align-self: center;
  opacity: 0.4;
`;
