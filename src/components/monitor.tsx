import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ThemeConfig,
  UnorderedList,
  Text,
  border,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { circuitState } from "../atoms/circuit";
import { displayState, displayStateSelector } from "../atoms/display";
import { useEffect } from "react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export const Monitor = () => {
  const circuit = useRecoilValue(circuitState);
  const [display, setDisplay] = useRecoilState(displayState);
  const [displaySelector, setDisplaySelector] =
    useRecoilState(displayStateSelector);
  const onSelectVideo = (v: string) => {
    setDisplaySelector({
      ...display,
      currentVideo: v,
    });
  };
  const onSelectShader = (s: string) => {
    setDisplaySelector({
      ...display,
      currentShader: s,
    });
  };

  useEffect(() => {
    // console.warn(window.electron.getVideoList().then(l => {console.log(l)}).catch(e => {console.warn(e)}))
    console.warn(window.electron.getVideoList());
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Box w="200px">
          <Text fontSize={"xl"}>Circuit</Text>
          <Text fontSize={"lg"}>knob1 : {circuit.knob1}</Text>
          <Text fontSize={"lg"}>knob2 : {circuit.knob2}</Text>
          <Text fontSize={"lg"}>knob3 : {circuit.knob3}</Text>
          <Text fontSize={"lg"}>knob4 : {circuit.knob4}</Text>
          <Text fontSize={"lg"}>knob5 : {circuit.knob5}</Text>
          <Text fontSize={"lg"}>knob6 : {circuit.knob6}</Text>
          <Text fontSize={"lg"}>knob7 : {circuit.knob7}</Text>
          <Text fontSize={"lg"}>knob8 : {circuit.knob8}</Text>
        </Box>
        <Box w="200px">
          <Text fontSize={"xl"}>Display</Text>
          <Text fontSize={"lg"}>video : {display.currentVideo}</Text>
          <Text fontSize={"lg"}>shader : {display.currentShader}</Text>
        </Box>
        <Box w="200px" p={10}>
          <Slider
            defaultValue={display.bpm}
            onChange={(val) => setDisplaySelector({ ...display, bpm: val })}
            min={60}
            max={200}
          >
            <SliderMark
              value={display.bpm}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {display.bpm}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Flex>
      <Flex flexDirection={"row"}>
        <Box>
          <Tabs size={"md"}>
            <TabList>
              <Tab>Video</Tab>
              <Tab>Shader</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex flexDirection={"row"} flexWrap={"wrap"}>
                  {display.videoList?.map((v) => {
                    return (
                      <Box key={v}>
                        <video
                          muted
                          loop
                          src={v}
                          width={"300px"}
                          onClick={() => onSelectVideo(v)}
                          style={{
                            borderWidth:
                              display.currentVideo === v ? "2px" : "0px",
                            borderColor: "#f00",
                            borderStyle: "solid",
                            boxSizing: "border-box",
                          }}
                          onMouseEnter={(e) => {
                            if (e.target.paused) {
                              e.target.play();
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (e.target.played) {
                              e.target.pause();
                            }
                          }}
                        />
                      </Box>
                    );
                  })}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Stack spacing={4}>
                  {display.shaderList?.map((s) => {
                    return (
                      <Button
                        key={s}
                        value={s}
                        onClick={() => onSelectShader(s)}
                        isActive={display.currentShader === s}
                      >
                        {s}
                      </Button>
                    );
                  })}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
