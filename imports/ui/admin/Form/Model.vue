<template>
  <div class="card">
      <div class="card-content">
          <div class="content">
              <div class="columns">
                  <div class="column is-8">
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                            <label class="label">Nazwa</label>
                            <p class="control has-icons-left">
                                <input class="input" type="text" placeholder="Nazwa producenta" v-model="form.name" />
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
                                <input class="input" type="text" placeholder="Logo" v-model="form.photo" />
                                <span class="icon is-small is-left">
                                    <font-awesome-icon :icon="['fas', 'file-alt']" />
                                </span>
                            </p>
                      </div>
                    </div>
                    <div class="column">
                      <b-field label="Wybierz producenta">
                        <b-select placeholder="Wybierz producenta" v-model="form.producer">
                          <option value="0">
                            Wybierz producenta
                          </option>
                          <option
                              v-for="option in producers"
                              :value="option._id"
                              :key="option._id">
                              {{ option.name }}
                          </option>
                        </b-select>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="columns">
                <div class="column is-12">
                  <b-field label="Opis (html)">
                    <vue-editor v-model="form.description"></vue-editor>
                  </b-field>
                  <h2>Wersje silnikowe</h2>
                  <ul>
                    <li v-for="(engine, index) in form.engines">
                      {{ engine.capacity }} - {{ engine.fuel }}
                      <a href="#" @click.prevent="removeRow('engine', index)">x</a>
                    </li>
                  </ul>
                  <b-field grouped style="align-items:center">
                    <b-field label="Paliwo">
                      <b-select placeholder="Wybierz producenta" v-model="form.engine.fuel">
                        <option value="0">
                          Wybierz paliwo
                        </option>
                        <option
                            v-for="option in fuels"
                            :value="option"
                            :key="option">
                            {{ option }}
                        </option>
                      </b-select>
                    </b-field>
                    <b-field label="Pojemność">
                      <b-input v-model="form.engine.capacity" type="text"></b-input>
                    </b-field>
                    <b-field label="Moc (KM)">
                      <b-input v-model="form.engine.power" type="text"></b-input>
                    </b-field>
                    <b-field label="Maksymalny moment (NM)">
                      <b-input v-model="form.engine.torque" type="text"></b-input>
                    </b-field>
                    <b-field>
                      <button class="button is-info" @click.prevent="addEngineVersion">Dodaj silnik</button>
                    </b-field>
                  </b-field grouped>
                  <hr />
                  <h2>Zdjęcia</h2>
                  <ul>
                    <li v-for="(photo, index) in form.photos">
                      {{ photo }}
                      <a href="#" @click.prevent="removeRow('photos', index)">x</a>
                    </li>
                  </ul>
                  <b-field grouped>
                    <b-field>
                      <b-input v-model="photoUrl" type="text"></b-input>
                    </b-field>
                    <b-field>
                      <button class="button is-info" @click.prevent="addPhoto">Dodaj</button>
                    </b-field>
                  </b-field grouped>
                  <b-field>
                    <a @click.prevent="saveProducer" class="button is-primary">Dodaj model</a>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";

export default {
  name: "add-model-form",
  props: {
    model: {
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
      fuels: ["Benzyna", "Diesel", "Hybryda", "Elektryczny", "LPG"],
      photoUrl: "/images/models/",
      form: {
        name: "",
        description: "",
        photo: "/images/models/",
        producer: 0,
        engine: {
          power: "",
          torque: "",
          capacity: "",
          fuel: 0
        },
        engines: [],
        photos: []
      },
      producers: null
    };
  },
  created() {
    Meteor.call("producers.all", (error, result) => {
      this.producers = result;
    });
  },
  methods: {
    getDataFromProps() {
      if (this.model) {
        this.form.name = this.model.name;
        this.form.photo = this.model.photo;
        this.form.description = this.model.description;
        this.form.producer = this.model.producer;
        this.form.engines = this.model.engines;
        this.form.photos = this.model.photos;
      }
    },
    addEngineVersion() {
      this.form.engines.push(this.form.engine);
      this.form.engine = {
        power: "",
        torque: "",
        capacity: ""
      };
    },
    removeRow(type, index) {
      if (type == "engine") {
        this.form.engines.splice(index, 1);
      }
      if (type == "photos") {
        this.form.photos.splice(index, 1);
      }
    },
    addPhoto() {
      console.log("a");
      this.form.photos.push(this.photoUrl);
      this.photoUrl = "/images/models";
    },
    saveProducer() {
      const model = {
        name: this.form.name,
        photo: this.form.photo,
        slug: this.form.name.toLowerCase().replace(/ /g, "-"),
        description: this.form.description,
        producer: this.form.producer,
        engines: this.form.engines,
        photos: this.form.photos
      };
      if (this.action == "add") {
        Meteor.call("models.add", model, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Model dodany",
              type: "is-success"
            });
            this.$emit("update-list");
            window.location = "/admin/models";
          }
        });
      }
      if (this.action == "edit") {
        Meteor.call("models.update", this.model._id, model, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Model zaktualizowany",
              type: "is-success"
            });
          }
        });
      }
    }
  },
  watch: {
    model() {
      this.getDataFromProps();
    }
  }
};
</script>
