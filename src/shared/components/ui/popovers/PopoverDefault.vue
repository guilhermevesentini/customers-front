<template>
  <div class="text-center">
<<<<<<< HEAD
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn color="indigo" v-bind="props"> Menu as Popover </v-btn>
      </template>
=======
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="indigo"
          v-bind="props"
        >
          Menu as Popover
        </v-btn>
      </template>

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            subtitle="Founder of Vuetify"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
<<<<<<< HEAD
        <v-divider></v-divider>
=======

        <v-divider></v-divider>

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>
<<<<<<< HEAD
          <v-list-item>
            <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer> <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
          <v-btn color="primary" variant="text" @click="menu = false"> Save </v-btn>
=======

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="menu = false"
          >
            Save
          </v-btn>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<<<<<<< HEAD

<script setup>
  import { ref } from "vue";

  const fav = ref(true);
  const menu = ref(false);
  const message = ref(false);
  const hints = ref(true);
</script>
=======
<script setup>
  import { ref } from 'vue'

  const fav = ref(true)
  const menu = ref(false)
  const message = ref(false)
  const hints = ref(true)
</script>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
