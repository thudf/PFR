/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import WebView from 'react-native-webview';

import Button from '../../components/ReadMoreButton';
import LoadingModal from '../../components/LoadingModal';

import {colors} from '../../global';

import {
  Container,
  Scroll,
  MainText,
  MainTextContainer,
  Title,
  Row,
  TreatmentImage,
  ContainerVideo,
} from './styles';

const screen = Dimensions.get('screen');

const TeamInfo = ({route}) => {
  const {treatmentInfo} = route.params;

  const [readMore, setReadMore] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    setImageHeight(screen.width * 0.9 * 0.5625);
    setImageWidth(screen.width * 0.9);
    setImageLoading(treatmentInfo.image ? true : false);

    if (treatmentInfo.video) {
      setImageLoading(true);
      setTimeout(() => {
        setImageLoading(false);
      }, 700);
    }
  }, [treatmentInfo]);

  const handleVideo = useCallback((video, bkg) => {
    return (
      <WebView
        allowsFullscreenVideo
        style={{
          backgroundColor: bkg,
          flex: 1,
          borderRadius: 4,
          paddingBottom: 0,
          position: 'relative',
          height: 20,
          overflow: 'hidden',
        }}
        scrollEnabled={false}
        automaticallyAdjustContentInsets
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
        useWebKit
        scalesPageToFit={false}
        allowsInlineMediaPlayback
        source={{
          html: `
              <html>
                <style>
                  .embed-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 95%;
                    border-radius: 4px;
                    overflow: hidden;
                  }
                  .embed-container iframe, .embed-container object, .embed-container embed {
                    position: absolute;
                    top: -5px;
                    left: 0;
                    width: 100%;
                    height: 105%;
                  }
                  .player.hide-controlls-mode {
                    pointer-events: none!important;
                  }
                </style>
                <script src="https://player.vimeo.com/api/player.js"></script>
                <body>
                  <div class="embed-container">
                    <iframe src="https://player.vimeo.com/video/${video}?background=0&autoplay=0"
                      frameBorder="0"
                      allow="fullscreen"
                      webkitAllowFullScreen
                      mozallowfullscreen
                      allowFullScreen></iframe>
                  </div
                </body>
              </html>
            `,
        }}
      />
    );
  }, []);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        {treatmentInfo.image && (
          <TreatmentImage
            height={imageHeight}
            source={{uri: treatmentInfo.image}}
            onLoadEnd={() => setImageLoading(false)}
          />
        )}

        {treatmentInfo.video && (
          <ContainerVideo
            width={imageWidth}
            height={imageHeight}
            loading={imageLoading}>
            {handleVideo(treatmentInfo.video, 'transparent')}
          </ContainerVideo>
        )}

        <Row>
          <Title>{treatmentInfo.title}</Title>
        </Row>

        <MainTextContainer readMore={readMore}>
          <MainText>{treatmentInfo.description}</MainText>
        </MainTextContainer>

        <Row>
          <Button
            style={{marginBottom: 52}}
            type="read_more"
            buttonColor={colors.grey}
            small
            onPress={() => setReadMore(!readMore)}>
            {readMore ? 'Ler menos' : 'Leia mais'}
          </Button>
        </Row>
      </Scroll>
      <LoadingModal visible={imageLoading} />
    </Container>
  );
};

export default TeamInfo;
