import axios from "axios";
export const getChannelInfo = channel_id => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channel_id}&key=AIzaSyCJ7poAgoa-VJITb7EsehnjoW-DA2UQsbQ`
  );
};

export const getVideoInfo = video_id => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${video_id}&key=AIzaSyCJ7poAgoa-VJITb7EsehnjoW-DA2UQsbQ`
  );
};
