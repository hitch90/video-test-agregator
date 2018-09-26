import Homepage from "/imports/ui/Homepage";
import Login from "/imports/ui/Login";
import Register from "/imports/ui/Register";
import AdminHomepage from "/imports/ui/admin/Homepage";
import AdminChannels from "/imports/ui/admin/Channels";
import AdminEditChannel from "/imports/ui/admin/EditChannel";
import AdminProducers from "/imports/ui/admin/Producers";
import AdminEditProducer from "/imports/ui/admin/EditProducer";
import AdminModels from "/imports/ui/admin/Models";
import AdminEditModel from "/imports/ui/admin/EditModel";
import AdminVideos from "/imports/ui/admin/Videos";
import AdminEditVideo from "/imports/ui/admin/EditVideo";
import ProducerPage from "/imports/ui/Producer";
import ModelPage from "/imports/ui/Models";
import ChannelPage from "/imports/ui/Channel";
import VideoPage from "/imports/ui/Video";
import SearchPage from "/imports/ui/Search";
export default [
  {
    path: "/",
    name: "index",
    component: Homepage
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/admin",
    name: "AdminHomepage",
    component: AdminHomepage
  },
  {
    path: "/admin/channels",
    name: "AdminChannels",
    component: AdminChannels
  },
  {
    path: "/admin/channel/:id",
    name: "AdminEditChannel",
    component: AdminEditChannel
  },
  {
    path: "/admin/producers",
    name: "AdminProducers",
    component: AdminProducers
  },
  {
    path: "/admin/producer/:id",
    name: "AdminEditProducer",
    component: AdminEditProducer
  },
  {
    path: "/admin/models",
    name: "AdminModels",
    component: AdminModels
  },
  {
    path: "/admin/model/:id",
    name: "AdminEditModel",
    component: AdminEditModel
  },
  {
    path: "/admin/videos",
    name: "AdminVideos",
    component: AdminVideos
  },
  {
    path: "/admin/video/:id",
    name: "AdminEditVideo",
    component: AdminEditVideo
  },
  {
    path: "/p/:slug",
    name: "ProducerPage",
    component: ProducerPage
  },
  {
    path: "/m/:slug",
    name: "ModelPage",
    component: ModelPage
  },
  {
    path: "/c/:slug",
    name: "ChannelPage",
    component: ChannelPage
  },
  {
    path: "/v/:id",
    name: "VideoPage",
    component: VideoPage
  },
  {
    path: "/search/:querystring",
    name: "SearchPage",
    component: SearchPage
  }
  // {
  //   path: "/page/:slug/:id",
  //   name: "page",
  //   component: Page,
  //   props: true
  // },
  // {
  //   path: "/posts",
  //   name: "posts",
  //   component: Posts,
  //   props: route => ({
  //     tags: route.query.tags
  //   })
  // }
];
