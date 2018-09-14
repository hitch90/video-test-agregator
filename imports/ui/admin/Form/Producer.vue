<template>
  <div class="card">
      <div class="card-content">
          <div class="content">
              <div class="columns">
                  <div class="column is-7">
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
                    <a @click.prevent="saveProducer" class="button is-primary">Dodaj producenta</a>
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
  name: "add-producer-form",
  props: {
    producer: {
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
        name: "",
        description: "",
        photo: "/images/logos/"
      }
    };
  },
  created() {},
  methods: {
    getDataFromProps() {
      if (this.producer) {
        this.form.name = this.producer.name;
        this.form.photo = this.producer.photo;
        this.form.description = this.producer.description;
      }
    },
    saveProducer() {
      const producer = {
        name: this.form.name,
        photo: this.form.photo,
        slug: this.form.name.toLowerCase().replace(/ /g, "-"),
        description: this.form.description
      };
      if (this.action == "add") {
        Meteor.call("producers.add", producer, (error, result) => {
          if (result) {
            this.$toast.open({
              message: "Producent dodany",
              type: "is-success"
            });
            this.$emit("update-list");
            this.form = {
              name: "",
              description: "",
              photo: "/images/logos/"
            };
            window.location = "/admin/producers";
          }
        });
      }
      if (this.action == "edit") {
        Meteor.call(
          "producers.update",
          this.producer._id,
          producer,
          (error, result) => {
            if (result) {
              this.$toast.open({
                message: "Producent zaktualizowany",
                type: "is-success"
              });
            }
          }
        );
      }
    }
  },
  watch: {
    producer() {
      this.getDataFromProps();
    }
  }
};
</script>
