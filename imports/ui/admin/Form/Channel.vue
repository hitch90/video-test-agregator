<template>
  <div class="card">
      <div class="card-content">
          <div class="content">
              <div class="columns">
                  <div class="column is-7">
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                            <label class="label">ID kanału</label>
                            <p class="control has-icons-left">
                                <input class="input" type="text" placeholder="ID kanału" v-model="form.channelId" />
                                <span class="icon is-small is-left">
                                    <font-awesome-icon :icon="['fas', 'file-alt']" />
                                </span>
                            </p>
                        </div>
                      </div>
                      <div class="column">
                        <a @click.prevent="channelInfo" class="button is-primary">Pobierz informację o kanale</a>
                      </div>
                    </div>
                    <hr />
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                            <label class="label">Nazwa</label>
                            <p class="control has-icons-left">
                                <input class="input" type="text" placeholder="Nazwa kanału" v-model="form.name" />
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
                  </div>
                </div>
              </div>
              <hr />
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Opis (html)">
                      <vue-editor v-model="form.description"></vue-editor>
                  </b-field>
                  <b-field>
                    <a @click.prevent="saveChannel" class="button is-primary">Dodaj kanał</a>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { getChannelInfo } from "../../helpers/ytApi";
import { VueEditor, Quill } from "vue2-editor";

export default {
  name: "add-channel-form",
  props: {
    channel: {
      default: null,
      required: false
    },
    action: {
      default: "add"
    }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        id: "",
        channelId: "",
        name: "",
        description: "",
        photo: ""
      }
    };
  },
  created() {},
  methods: {
    channelInfo() {
      getChannelInfo(this.form.channelId).then(response => {
        this.form = {
          id: response.data.items[0].id,
          name: response.data.items[0].snippet.title,
          description: response.data.items[0].snippet.description,
          photo: response.data.items[0].snippet.thumbnails.high.url
        };
      });
    },
    getDataFromProps() {
      if (this.channel) {
        this.form.id = this.channel.id;
        this.form.name = this.channel.name;
        this.form.photo = this.channel.photo;
        this.form.description = this.channel.description;
      }
    },
    saveChannel() {
      const channel = {
        id: this.form.id,
        name: this.form.name,
        photo: this.form.photo,
        slug: this.form.name.toLowerCase().replace(/ /g, "-"),
        description: this.form.description
      };
      if (this.action == "add") {
        Meteor.call("channels.add", channel, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Kanał dodany",
              type: "is-success"
            });
            this.$emit("update-list");
          }
        });
      }
      if (this.action == "edit") {
        Meteor.call(
          "channels.update",
          this.channel._id,
          channel,
          (error, result) => {
            if (result) {
              this.$toast.open({
                message: "Kanał zaktualizowany",
                type: "is-success"
              });
            }
          }
        );
      }
    }
  },
  watch: {
    channel() {
      this.getDataFromProps();
    }
  }
};
</script>
