<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-12">
            <div class="columns">
              <div class="column is-4">
                <b-field label="ID filmu">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="ID filmu" v-model="form.sourceId" />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'file-alt']" />
                    </span>
                  </p>
                </b-field>
                <a @click.prevent="videoInfo" class="button is-primary">Pobierz informację o filmie</a>
              </div>
            </div>
            <hr />
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Nazwa</label>
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Nazwa filmu" v-model="form.name" />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'file-alt']" />
                    </span>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Zdjęcie (nazwa pliku)</label>
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Avatar" v-model="form.photo" />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'file-alt']" />
                    </span>
                  </p>
                </div>
              </div>
              <div class="column">
                  <b-field label="Kanał">
                    <b-autocomplete
                       v-model="channelName"
                       placeholder=""
                       :keep-first="keepFirst"
                       :open-on-focus="openOnFocus"
                       :data="filteredChannels"
                       field="name"
                       @select="option => selected = option" />
                  </b-field>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column is-12">
            <div class="columns" v-if="this.actionValue == 'edit'">
              <div class="column is-4">
                <b-field label="Producent">
                  <b-input v-model="form.selectedProducer.name" disabled></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Model">
                  <b-input v-model="form.selectedModel.name" disabled></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Wersja silnikowa">
                  {{ form.engine.capacity }}, {{ form.engine.power }}
                </b-field>
              </div>
            </div>
            <a @click.prevent="editCategory" v-if="this.actionValue == 'edit'" class="button is-primary">Zmień</a>
            <div class="columns" v-if="this.actionValue == 'add'">
              <div class="column is-4">
                <b-field label="Producent">
                  <b-autocomplete
                     v-model="producerName"
                     placeholder=""
                     :keep-first="keepFirst"
                     :open-on-focus="openOnFocus"
                     :data="filteredProducers"
                     field="name"
                     @select="option => selected = option" />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Model">
                  <b-autocomplete
                     v-model="modelName"
                     placeholder=""
                     :keep-first="keepFirst"
                     :open-on-focus="openOnFocus"
                     :data="filteredModels"
                     field="name"
                     @select="option => selected = option" />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Wersja silnikowa"
                  v-if="form.selectedModel">
                  <ul>
                    <li v-for="(engine, index) in form.selectedModel.engines"
                      @click="selectEngine(index)"
                      :class="{'has-text-weight-bold has-text-success	' : activeEl == index}">
                      {{ engine.capacity }}, {{ engine.fuel }}, {{ engine.power }}KM
                    </li>
                  </ul>
                </b-field>
              </div>
            </div>
            <hr />
            <b-field label="Tagi">
              <b-taginput
                v-model="form.tags"
                ellipsis
                icon="label"
                placeholder="Add a tag">
              </b-taginput>
            </b-field>
            <b-field label="Opis (html)">
              <b-input type="textarea" v-model="form.description"></b-input>
            </b-field>
            <b-field label="Promocyjny">
              <b-switch v-model="form.promo"></b-switch>
            </b-field>
            <b-field>
              <a @click.prevent="saveVideo" class="button is-primary">Dodaj film</a>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoInfo } from "../../helpers/ytApi";
import { VueEditor, Quill } from "vue2-editor";

export default {
  name: "add-video-form",
  props: {
    video: {
      default: null,
      required: false
    },
    action: {
      default: "add"
    }
  },
  components: { VueEditor },
  computed: {
    filteredProducers() {
      if (this.producers) {
        return this.producers.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.producerName.toLowerCase()) >= 0
          );
        });
      }
    },
    filteredModels() {
      if (this.models) {
        return this.models.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.modelName.toLowerCase()) >= 0
          );
        });
      }
    },
    filteredChannels() {
      if (this.channels) {
        return this.channels.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.channelName.toLowerCase()) >= 0
          );
        });
      }
    }
  },
  data() {
    return {
      keepFirst: false,
      openOnFocus: true,
      producerName: "",
      channelName: "",
      modelName: "",
      activeEl: null,
      form: {
        video_id: "",
        sourceId: "",
        name: "",
        description: "",
        photo: "/images/videos/",
        channel: "",
        selectedProducer: "",
        selectedModel: "",
        engine: "",
        tags: [],
        promo: false,
        added: new Date(),
        duration: "PT0M0S"
      },
      models: null,
      producers: null,
      channels: null,
      actionValue: this.action
    };
  },
  created() {
    Meteor.call("producers.all", (error, result) => {
      this.producers = result;
    });
    Meteor.call("channels.all", (error, result) => {
      this.channels = result;
    });
  },
  methods: {
    videoInfo() {
      getVideoInfo(this.form.sourceId).then(response => {
        this.form.video_id = response.data.items[0].id;
        this.form.name = response.data.items[0].snippet.title;
        this.form.description = response.data.items[0].snippet.description;
        this.form.photo = response.data.items[0].snippet.thumbnails.maxres.url;
        this.form.tags = response.data.items[0].snippet.tags;
        this.form.duration = response.data.items[0].contentDetails.duration
          ? response.data.items[0].contentDetails.duration
          : "PT0M0S";
      });
    },
    editCategory() {
      this.actionValue = "add";
      this.form.selectedModel = null;
      this.form.selectedProducer = null;
    },
    getDataFromProps() {
      if (this.video) {
        this.form.video_id = this.video.video_id;
        this.form.name = this.video.name;
        this.form.photo = this.video.photo;
        this.form.description = this.video.description;
        this.form.selectedModel = this.video.model;
        this.form.selectedProducer = this.video.producer;
        this.form.engine = this.video.engine;
        this.form.tags = this.video.tags;
        this.form.channel = this.video.channel;
        this.form.promo = this.video.promo;
        this.form.added = this.video.added;
        this.form.duration = this.video.duration;
        this.form.created_at = this.video.created_at;
      }
    },
    selectEngine(index) {
      this.activeEl = index;
      this.form.engine = this.form.selectedModel.engines[index];
    },
    saveVideo() {
      const video = {
        video_id: this.form.video_id,
        name: this.form.name,
        photo: this.form.photo,
        slug: this.form.name.toLowerCase().replace(/ /g, "-"),
        description: this.form.description,
        model: this.form.selectedModel,
        producer: this.form.selectedProducer,
        engine: this.form.engine,
        tags: this.form.tags,
        website: "youtube",
        channel: this.form.channel,
        promo: this.form.promo,
        added: this.form.added,
        duration: this.form.duration,
        created_at: Date.parse(this.form.added)
      };
      if (this.action == "add") {
        Meteor.call("videos.add", video, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Film dodany",
              type: "is-success"
            });
            this.$emit("update-list");
          }
        });
      }
      if (this.action == "edit") {
        Meteor.call("videos.update", this.video._id, video, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Film zaktualizowany",
              type: "is-success"
            });
          }
        });
      }
    }
  },
  watch: {
    video() {
      this.getDataFromProps();
    },
    producerName() {
      if (this.producerName) {
        this.form.selectedProducer = this.producers.find(
          x => x.name === this.producerName
        );
        Meteor.call(
          "models.producer",
          this.form.selectedProducer._id,
          (error, result) => {
            if (result) {
              this.models = result;
            }
          }
        );
      }
    },
    modelName() {
      if (this.modelName)
        this.form.selectedModel = this.models.find(
          x => x.name === this.modelName
        );
    },
    channelName() {
      if (this.channelName)
        this.form.channel = this.channels.find(
          x => x.name === this.channelName
        );
    }
  }
};
</script>
