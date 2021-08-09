import React, {useLayoutEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';

import icone_apagar from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-apagar.svg';

import {
  Container,
  Wrapper,
  ImageContainer,
  SharedContentImage,
  SharedContentTitle,
} from './styles';

const SharedContent = ({content, deleteSharedContent}) => {
  const [imageTitle, setImageTitle] = useState('');

  useLayoutEffect(() => {
    if (content) {
      const contentArray = content.split('/');
      setImageTitle(contentArray[contentArray.length - 1]);
    }
  }, [content]);

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <SharedContentImage source={{uri: content}} />
        </ImageContainer>
        <SharedContentTitle numberOfLines={1}>{imageTitle}</SharedContentTitle>
      </Wrapper>

      <TouchableOpacity
        style={{marginLeft: 13}}
        onPress={() => deleteSharedContent()}>
        <SvgXml xml={icone_apagar} width={10} height={10} />
      </TouchableOpacity>
    </Container>
  );
};

export default SharedContent;
